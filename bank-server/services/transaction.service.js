import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.utils.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import PaymentMethod from "../models/paymentMethod.model.js";
import ApiError from "../utils/apiError.utils.js";
import { generateTransactionReference } from "../utils/transaction.utils.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.utils.js";
import { comparePassword } from "../utils/password.utils.js";
import { wireTransferPendingMail, localTransferSentMail, localTransferReceivedMail } from "./mail.service.js";

// Transfer funds service(local)

export const transferFunds = async (senderId, transferData) => {
    const { recipientAccountNumber, amount, description, transactionPin } =
        transferData;

    // Start MongoDB session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // -----------------------------------------
        // 1. Validate transfer amount
        // -----------------------------------------

        if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
            throw new ApiError(400, "Invalid transfer amount.");
        }

        // -----------------------------------------
        // 2. Find sender
        // -----------------------------------------

        const sender = await User.findById(senderId)
            .select("transactionPin")
            .session(session);

        if (!sender) {
            throw new ApiError(404, "User not found.");
        }

        // -----------------------------------------
        // 3. Make sure transaction PIN exists
        // -----------------------------------------

        if (!sender.transactionPin) {
            throw new ApiError(400, "Transaction PIN has not been set.");
        }

        // -----------------------------------------
        // 4. Verify transaction PIN
        // -----------------------------------------

        if (!transactionPin) {
            throw new ApiError(400, "Transaction PIN is required.");
        }

        const isValidPin = await comparePassword(
            transactionPin,
            sender.transactionPin,
        );

        if (!isValidPin) {
            throw new ApiError(400, "Invalid transaction PIN.");
        }

        // -----------------------------------------
        // 5. Find sender's account
        // -----------------------------------------

        const senderAccount = await Account.findOne({
            owner: senderId,
        }).session(session);

        if (!senderAccount) {
            throw new ApiError(404, "Sender account not found.");
        }

        // -----------------------------------------
        // 6. Ensure sender account is active
        // -----------------------------------------

        if (senderAccount.status !== "active") {
            throw new ApiError(400, "Sender account is not active.");
        }

        // -----------------------------------------
        // 7. Prevent self-transfer
        // -----------------------------------------

        if (senderAccount.accountNumber === recipientAccountNumber) {
            throw new ApiError(400, "You cannot transfer to your own account.");
        }

        // -----------------------------------------
        // 8. Ensure sufficient balance
        // -----------------------------------------

        if (senderAccount.balance < amount) {
            throw new ApiError(400, "Insufficient balance.");
        }

        // -----------------------------------------
        // 9. Find recipient account
        // -----------------------------------------

        const receiverAccount = await Account.findOne({
            accountNumber: recipientAccountNumber,
        }).session(session);

        if (!receiverAccount) {
            throw new ApiError(404, "Recipient account not found.");
        }

        // -----------------------------------------
        // 10. Ensure recipient account is active
        // -----------------------------------------

        if (receiverAccount.status !== "active") {
            throw new ApiError(400, "Recipient account is not active.");
        }

        // -----------------------------------------
        // 12. Generate transaction reference
        // -----------------------------------------

        const reference = generateTransactionReference();

        // -----------------------------------------
        // 13. Update balances
        // -----------------------------------------

        senderAccount.balance -= amount;

        receiverAccount.balance += amount;

        // -----------------------------------------
        // 14. Create sender transaction
        // -----------------------------------------

        const senderTransaction = new Transaction({
            owner: senderId,

            ownerAccount: senderAccount._id,

            counterParty: receiverAccount.owner,

            counterPartyAccount: receiverAccount._id,

            method: "local transfer",

            amount,

            type: "transfer",

            direction: "debit",

            reference,

            description,

            status: "completed",
        });

        // -----------------------------------------
        // 15. Create receiver transaction
        // -----------------------------------------

        const receiverTransaction = new Transaction({
            owner: receiverAccount.owner,

            ownerAccount: receiverAccount._id,

            counterParty: senderId,

            counterPartyAccount: senderAccount._id,

            method: "local transfer",

            amount,

            type: "transfer",

            direction: "credit",

            reference,

            description,

            status: "completed",
        });

        // -----------------------------------------
        // 16. Save transactions
        // -----------------------------------------

        await senderTransaction.save({
            session,
        });

        await receiverTransaction.save({
            session,
        });

        // -----------------------------------------
        // 17. Save updated balances
        // -----------------------------------------

        await senderAccount.save({
            session,
        });

        await receiverAccount.save({
            session,
        });

        // -----------------------------------------
        // 18. Commit everything
        // -----------------------------------------

        await session.commitTransaction();

        await localTransferSentMail(
            sender.email,
            `${sender.firstName} ${sender.lastName}`,
            amount,
            `${receiverAccount.owner.firstName} ${receiverAccount.owner.lastName}`,
            reference
        );

        await localTransferReceivedMail(
            receiverAccount.owner.email,
            `${receiverAccount.owner.firstName} ${receiverAccount.owner.lastName}`,
            amount,
            `${sender.firstName} ${sender.lastName}`,
            reference,
            description
        );

        // -----------------------------------------
        // 19. Return transfer details
        // -----------------------------------------

        return {
            transactionId: senderTransaction._id,

            reference: senderTransaction.reference,

            amount: senderTransaction.amount,

            description: senderTransaction.description,

            status: senderTransaction.status,
        };
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw error;
    } finally {
        await session.endSession();
    }
};

// Get transfer recipient
export const getTransferRecipient = async (accountNumber) => {
    const account = await Account.findOne({
        accountNumber,
    }).populate("owner", "firstName lastName");

    if (!account) {
        throw new ApiError(404, "Account not found.");
    }

    if (account.status !== "active") {
        throw new ApiError(400, "Recipient account is not active.");
    }

    return {
        accountNumber: account.accountNumber,
        firstName: account.owner.firstName,
        lastName: account.owner.lastName,
    };
};

// International transfer
export const internationalTransfer = async (senderId, transferData) => {
    const {
        beneficiaryAccountName,
        beneficiaryAccountNumber,
        bankName,
        bankAddress,
        accountType,
        country,
        iban,
        swiftCode,
        amount,
        transactionPin,
        note,
    } = transferData;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Find the sender
        const sender = await User.findById(senderId).session(session);

        if (!sender) {
            throw new ApiError(404, "User not found.");
        }

        // Verify transaction PIN
        const isPinValid = await comparePassword(
            transactionPin,
            sender.transactionPin,
        );

        if (!isPinValid) {
            throw new ApiError(400, "Invalid transaction PIN.");
        }

        // Find sender's account
        const senderAccount = await Account.findOne({
            owner: senderId,
        }).session(session);

        if (!senderAccount) {
            throw new ApiError(404, "Sender account not found.");
        }

        // Make sure account is active
        if (senderAccount.status !== "active") {
            throw new ApiError(400, "Sender account is not active.");
        }

        // Check balance
        if (senderAccount.balance < amount) {
            throw new ApiError(400, "Insufficient balance.");
        }

        // Generate transaction reference
        const reference = generateTransactionReference();

        // Debit sender immediately
        senderAccount.balance -= amount;

        // Create pending international transaction
        const transaction = new Transaction({
            owner: senderId,

            ownerAccount: senderAccount._id,

            amount,

            type: "international_transfer",

            direction: "debit",

            method: "international transfer",

            reference,

            description: note,

            status: "pending",

            internationalDetails: {
                beneficiaryAccountName,
                beneficiaryAccountNumber,
                bankName,
                bankAddress,
                accountType,
                country,
                iban,
                swiftCode,
            },
        });

        // Save transaction
        await transaction.save({ session });

        // Save new account balance
        await senderAccount.save({ session });

        // Commit everything
        await session.commitTransaction();

        // When user submits transfer
        await wireTransferPendingMail(
            sender.email,
            `${sender.firstName} ${sender.lastName}`,
            transaction.amount,
            transaction.internationalDetails.beneficiaryAccountName
        );

        return {
            transactionId: transaction._id,
            reference: transaction.reference,
            amount: transaction.amount,
            currency: senderAccount.currency,
            description: transaction.description,
            status: transaction.status,
        };
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw error;
    } finally {
        await session.endSession();
    }
};

// Deposit funds
export const depositFunds = async (userId, depositData, receiptFile) => {
    const { amount, method } = depositData;

    // Start MongoDB session
    const session = await mongoose.startSession();

    // Will hold the uploaded Cloudinary image details
    let uploadedReceipt = null;

    try {
        session.startTransaction();

        // Ensure receipt was uploaded
        if (!receiptFile) {
            throw new ApiError(400, "Deposit receipt is required.");
        }

        // Find user's account
        const account = await Account.findOne({
            owner: userId,
        }).session(session);

        if (!account) {
            throw new ApiError(404, "Account not found.");
        }

        // Ensure account is active
        if (account.status !== "active") {
            throw new ApiError(400, "Account is not active.");
        }

        // Upload receipt to Cloudinary
        uploadedReceipt = await uploadImage(receiptFile.buffer, "neon/deposits");

        // Generate unique transaction reference
        const reference = generateTransactionReference();

        // Create pending deposit transaction
        const [transaction] = await Transaction.create(
            [
                {
                    owner: userId,
                    ownerAccount: account._id,
                    amount,
                    method,
                    type: "deposit",
                    direction: "credit",
                    reference,
                    status: "pending",

                    // Cloudinary data
                    receipt: uploadedReceipt.secure_url,
                    receiptPublicId: uploadedReceipt.public_id,
                },
            ],
            { session },
        );

        // Commit database transaction
        await session.commitTransaction();

        // Return transaction details
        return {
            transactionId: transaction._id,
            reference: transaction.reference,
            amount: transaction.amount,
            paymentMethod: transaction.method,
            receipt: transaction.receipt,
            status: transaction.status,
            createdAt: transaction.createdAt,
        };
    } catch (error) {
        // Roll back database transaction
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        // Delete uploaded receipt if the database transaction failed
        if (uploadedReceipt?.public_id) {
            try {
                await deleteImage(uploadedReceipt.public_id);
            } catch (cloudinaryError) {
                console.error(
                    "Failed to delete uploaded receipt:",
                    cloudinaryError.message,
                );
            }
        }

        throw error;
    } finally {
        // Always end the session
        await session.endSession();
    }
};

// Approve Deposit
export const approveDeposit = async (depositId) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Find the pending deposit
        const deposit = await Transaction.findById(depositId).session(session);

        if (!deposit) {
            throw new ApiError(404, "Deposit transaction not found.");
        }

        // Ensure this is actually a deposit
        if (deposit.type !== "deposit") {
            throw new ApiError(400, "This transaction is not a deposit.");
        }

        // Only pending deposits can be approved
        if (deposit.status !== "pending") {
            throw new ApiError(400, "Only pending deposits can be approved.");
        }

        // Find the account associated with the deposit
        const account = await Account.findById(deposit.ownerAccount).session(
            session,
        );

        if (!account) {
            throw new ApiError(404, "Account not found.");
        }

        // Ensure the account is active
        if (account.status !== "active") {
            throw new ApiError(400, "Account is not active.");
        }

        // Credit the deposit amount to the account
        account.balance += deposit.amount;

        await account.save({ session });

        // Mark the deposit as completed
        deposit.status = "completed";

        await deposit.save({ session });

        // Commit both changes together
        await session.commitTransaction();

        return {
            transactionId: deposit._id,
            reference: deposit.reference,
            amount: deposit.amount,
            paymentMethod: deposit.paymentMethod,
            status: deposit.status,
            accountId: account._id,
            newBalance: account.balance,
            completedAt: deposit.updatedAt,
        };
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        throw error;
    } finally {
        await session.endSession();
    }
};

// Get transaction history
export const getTransactionHistory = async (userId) => {
    const transactions = await Transaction.find({
        owner: userId,
    })
        .populate("counterParty", "firstName lastName")
        .populate("counterPartyAccount", "accountNumber")
        .sort({ createdAt: -1 });

    return transactions;
};
