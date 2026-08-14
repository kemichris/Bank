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
import {
  wireTransferPendingMail,
  localTransferSentMail,
  localTransferReceivedMail,
} from "./mail.service.js";

// Transfer funds service(local)
export const transferFunds = async (senderId, transferData, options = {}) => {
  const { bypassPin = false, sendEmails = true } = options;
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
      .select("firstName lastName email transactionPin")
      .session(session);

    if (!sender) {
      throw new ApiError(404, "User not found.");
    }

    // -----------------------------------------
    // 4. Verify transaction PIN
    // -----------------------------------------
    if (!bypassPin) {
      if (!sender.transactionPin) {
        throw new ApiError(400, "Transaction PIN has not been set.");
      }
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
    })
      .populate("owner", "firstName lastName email")
      .session(session);

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

    if (sendEmails) {
      await localTransferSentMail(
        sender.email,
        `${sender.firstName} ${sender.lastName}`,
        amount,
        `${receiverAccount.owner.firstName} ${receiverAccount.owner.lastName}`,
        reference,
      );

      await localTransferReceivedMail(
        receiverAccount.owner.email,
        `${receiverAccount.owner.firstName} ${receiverAccount.owner.lastName}`,
        amount,
        `${sender.firstName} ${sender.lastName}`,
        reference,
        description,
      );
    }

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

// International transfer service
export const internationalTransfer = async (
  senderId,
  transferData,
  options = {},
) => {
  const { bypassPin = false, sendEmails = true } = options;

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
    // 2. Validate required transfer details
    // -----------------------------------------

    if (
      !beneficiaryAccountName ||
      !beneficiaryAccountNumber ||
      !bankName ||
      !country
    ) {
      throw new ApiError(400, "Please provide all required transfer details.");
    }

    // -----------------------------------------
    // 3. Find sender
    // -----------------------------------------

    const sender = await User.findById(senderId)
      .select("firstName lastName email transactionPin")
      .session(session);

    if (!sender) {
      throw new ApiError(404, "User not found.");
    }

    // -----------------------------------------
    // 4. Validate transaction PIN
    // -----------------------------------------

    if (!bypassPin) {
      if (!sender.transactionPin) {
        throw new ApiError(400, "Transaction PIN has not been set.");
      }

      if (!transactionPin) {
        throw new ApiError(400, "Transaction PIN is required.");
      }

      const isPinValid = await comparePassword(
        transactionPin,
        sender.transactionPin,
      );

      if (!isPinValid) {
        throw new ApiError(400, "Invalid transaction PIN.");
      }
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
    // 7. Ensure sufficient balance
    // -----------------------------------------

    if (senderAccount.balance < amount) {
      throw new ApiError(400, "Insufficient balance.");
    }

    // -----------------------------------------
    // 8. Generate transaction reference
    // -----------------------------------------

    const reference = generateTransactionReference();

    // -----------------------------------------
    // 9. Debit sender's account
    // -----------------------------------------

    senderAccount.balance -= amount;

    // -----------------------------------------
    // 10. Create transaction
    // -----------------------------------------

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

    // -----------------------------------------
    // 11. Save transaction
    // -----------------------------------------

    await transaction.save({
      session,
    });

    // -----------------------------------------
    // 12. Save updated balance
    // -----------------------------------------

    await senderAccount.save({
      session,
    });

    // -----------------------------------------
    // 13. Commit transaction
    // -----------------------------------------

    await session.commitTransaction();

    // -----------------------------------------
    // 14. Send email notification
    // -----------------------------------------

    if (sendEmails) {
      await wireTransferPendingMail(
        sender.email,
        `${sender.firstName} ${sender.lastName}`,
        amount,
        beneficiaryAccountName,
      );
    }

    // -----------------------------------------
    // 15. Return transaction details
    // -----------------------------------------

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

// // Approve Deposit
// export const approveDeposit = async (depositId) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     // Find the pending deposit
//     const deposit = await Transaction.findById(depositId).session(session);

//     if (!deposit) {
//       throw new ApiError(404, "Deposit transaction not found.");
//     }

//     // Ensure this is actually a deposit
//     if (deposit.type !== "deposit") {
//       throw new ApiError(400, "This transaction is not a deposit.");
//     }

//     // Only pending deposits can be approved
//     if (deposit.status !== "pending") {
//       throw new ApiError(400, "Only pending deposits can be approved.");
//     }

//     // Find the account associated with the deposit
//     const account = await Account.findById(deposit.ownerAccount).session(
//       session,
//     );

//     if (!account) {
//       throw new ApiError(404, "Account not found.");
//     }

//     // Ensure the account is active
//     if (account.status !== "active") {
//       throw new ApiError(400, "Account is not active.");
//     }

//     // Credit the deposit amount to the account
//     account.balance += deposit.amount;

//     await account.save({ session });

//     // Mark the deposit as completed
//     deposit.status = "completed";

//     await deposit.save({ session });

//     // Commit both changes together
//     await session.commitTransaction();

//     return {
//       transactionId: deposit._id,
//       reference: deposit.reference,
//       amount: deposit.amount,
//       paymentMethod: deposit.paymentMethod,
//       status: deposit.status,
//       accountId: account._id,
//       newBalance: account.balance,
//       completedAt: deposit.updatedAt,
//     };
//   } catch (error) {
//     if (session.inTransaction()) {
//       await session.abortTransaction();
//     }

//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };

// Get transaction history
export const getTransactionHistory = async (userId) => {
  const transactions = await Transaction.find({
    owner: userId,
  })
    .populate("owner", " firstName lastName")
    .populate("counterParty", "firstName lastName")
    .populate("counterPartyAccount", "accountNumber")
    .sort({ createdAt: -1 });

  return transactions;
};

// Confirm Transaction
export const confirmTransaction = async (transactionId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transaction =
      await Transaction.findById(transactionId).session(session);

    if (!transaction) {
      throw new ApiError(404, "Transaction not found.");
    }

    if (transaction.status !== "pending") {
      throw new ApiError(400, "Only pending transactions can be confirmed.");
    }

    if (transaction.direction === "credit") {
      const account = await Account.findById(transaction.ownerAccount).session(
        session,
      );

      if (!account) {
        throw new ApiError(404, "Account not found.");
      }

      if (account.status !== "active") {
        throw new ApiError(400, "Account is not active.");
      }

      account.balance += transaction.amount;

      await account.save({ session });
    }

    transaction.status = "completed";

    await transaction.save({ session });

    await session.commitTransaction();

    return transaction;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

// Reject transaction
export const rejectTransaction = async (transactionId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const transaction =
      await Transaction.findById(transactionId).session(session);

    if (!transaction) {
      throw new ApiError(404, "Transaction not found.");
    }

    if (transaction.status !== "pending") {
      throw new ApiError(400, "Only pending transactions can be rejected.");
    }

    // Only refund debits
    if (transaction.direction === "debit") {
      const account = await Account.findById(transaction.ownerAccount).session(
        session,
      );

      if (!account) {
        throw new ApiError(404, "Account not found.");
      }

      account.balance += transaction.amount;

      await account.save({ session });
    }

    transaction.status = "rejected";

    await transaction.save({ session });

    await session.commitTransaction();

    return transaction;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

// Delete Transaction
export const deleteTransaction = async (transactionId) => {
  const transaction = await Transaction.findByIdAndDelete(transactionId);

  if (!transaction) {
    throw new ApiError(404, "Transaction not found.");
  }

  return true;
};
