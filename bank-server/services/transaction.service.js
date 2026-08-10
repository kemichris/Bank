import mongoose from 'mongoose';
import cloudinary from '../utils/cloudinary.utils.js';
import Account from '../models/account.model.js';
import Transaction from '../models/transaction.model.js';
import PaymentMethod from '../models/paymentMethod.model.js';
import ApiError from '../utils/apiError.utils.js';
import { generateTransactionReference } from '../utils/transaction.utils.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.utils.js';

// Transfer funds service
export const transferFunds = async (senderId, transferData) => {
    const {
        recipientAccountNumber,
        amount,
        description
    } = transferData;

    // Start MongoDB session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Find sender's account
        const senderAccount = await Account.findOne({
            owner: senderId
        }).session(session);

        if (!senderAccount) {
            throw new ApiError(404, 'Sender account not found.');
        }

        // Ensure sender account is active
        if (senderAccount.status !== 'active') {
            throw new ApiError(400, 'Sender account is not active.');
        }

        // Prevent self-transfer
        if (senderAccount.accountNumber === recipientAccountNumber) {
            throw new ApiError(400, 'You cannot transfer to your own account.');
        }

        // Ensure sender has sufficient balance
        if (senderAccount.balance < amount) {
            throw new ApiError(400, 'Insufficient balance.');
        }

        // Find recipient's account
        const receiverAccount = await Account.findOne({
            accountNumber: recipientAccountNumber
        })
            .populate('owner')
            .session(session);

        if (!receiverAccount) {
            throw new ApiError(404, 'Recipient account not found.');
        }

        // Ensure recipient account is active
        if (receiverAccount.status !== 'active') {
            throw new ApiError(400, 'Recipient account is not active.');
        }

        // Ensure both accounts use the same currency
        if (senderAccount.currency !== receiverAccount.currency) {
            throw new ApiError(400, 'Currency mismatch.');
        }

        // Generate unique transaction reference
        const reference = generateTransactionReference();

        // Debit sender
        senderAccount.balance -= amount;

        // Credit receiver
        receiverAccount.balance += amount;

        // Sender's transaction record
        const senderTransaction = new Transaction({
            owner: senderId,
            ownerAccount: senderAccount._id,

            counterParty: receiverAccount.owner._id,
            counterPartyAccount: receiverAccount._id,
            method: 'local transfer',
            amount,
            currency: senderAccount.currency,
            type: 'transfer',
            direction: 'debit',
            reference,
            description,
            status: 'completed'
        });

        // Receiver's transaction record
        const receiverTransaction = new Transaction({
            owner: receiverAccount.owner._id,
            ownerAccount: receiverAccount._id,

            counterParty: senderId,
            counterPartyAccount: senderAccount._id,
            method: 'local transfer',
            amount,
            currency: receiverAccount.currency,
            type: 'transfer',
            direction: 'credit',
            reference,
            description,
            status: 'completed'
        });

        // Save both transaction records
        await senderTransaction.save({ session });
        await receiverTransaction.save({ session });

        // Save updated account balances
        await senderAccount.save({ session });
        await receiverAccount.save({ session });

        // Commit transaction
        await session.commitTransaction();

        // Return transfer details
        return {
            transactionId: senderTransaction._id,
            reference: senderTransaction.reference,
            amount: senderTransaction.amount,
            currency: senderTransaction.currency,
            description: senderTransaction.description,
            status: senderTransaction.status
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
export const getTransferRecipient = async accountNumber => {
    const account = await Account.findOne({
        accountNumber
    }).populate('owner', 'firstName lastName');

    if (!account) {
        throw new ApiError(
            404,
            'Account not found.'
        );
    }

    if (account.status !== 'active') {
        throw new ApiError(
            400,
            'Recipient account is not active.'
        );
    }

    return {
        accountNumber: account.accountNumber,
        firstName: account.owner.firstName,
        lastName: account.owner.lastName
    };
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
            throw new ApiError(400, 'Deposit receipt is required.');
        }

        // Find user's account
        const account = await Account.findOne({
            owner: userId
        }).session(session);

        if (!account) {
            throw new ApiError(404, 'Account not found.');
        }

        // Ensure account is active
        if (account.status !== 'active') {
            throw new ApiError(400, 'Account is not active.');
        }

        // Upload receipt to Cloudinary
        uploadedReceipt = await uploadImage(
            receiptFile.buffer,
            'neon/deposits'
        );

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
                    type: 'deposit',
                    direction: 'credit',
                    reference,
                    status: 'pending',

                    // Cloudinary data
                    receipt: uploadedReceipt.secure_url,
                    receiptPublicId: uploadedReceipt.public_id
                }
            ],
            { session }
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
            createdAt: transaction.createdAt
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
                    'Failed to delete uploaded receipt:',
                    cloudinaryError.message
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
        const deposit = await Transaction.findById(
            depositId
        ).session(session);

        if (!deposit) {
            throw new ApiError(
                404,
                'Deposit transaction not found.'
            );
        }

        // Ensure this is actually a deposit
        if (deposit.type !== 'deposit') {
            throw new ApiError(
                400,
                'This transaction is not a deposit.'
            );
        }

        // Only pending deposits can be approved
        if (deposit.status !== 'pending') {
            throw new ApiError(
                400,
                'Only pending deposits can be approved.'
            );
        }

        // Find the account associated with the deposit
        const account = await Account.findById(
            deposit.ownerAccount
        ).session(session);

        if (!account) {
            throw new ApiError(
                404,
                'Account not found.'
            );
        }

        // Ensure the account is active
        if (account.status !== 'active') {
            throw new ApiError(
                400,
                'Account is not active.'
            );
        }

        // Credit the deposit amount to the account
        account.balance += deposit.amount;

        await account.save({ session });

        // Mark the deposit as completed
        deposit.status = 'completed';

        await deposit.save({ session });

        // Commit both changes together
        await session.commitTransaction();

        return {
            transactionId: deposit._id,
            reference: deposit.reference,
            amount: deposit.amount,
            currency: deposit.currency,
            paymentMethod: deposit.paymentMethod,
            status: deposit.status,
            accountId: account._id,
            newBalance: account.balance,
            completedAt: deposit.updatedAt
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
        owner: userId
    })
        .populate('counterParty', 'firstName lastName')
        .populate('counterPartyAccount', 'accountNumber')
        .sort({ createdAt: -1 });

    return transactions;
};

