import * as transactionService from "../services/transaction.service.js";

// Transfer funds (local)
export const transferFunds = async (req, res, next) => {
  try {
    const transfer = await transactionService.transferFunds(
      req.user._id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Transfer successful.",
      data: transfer,
    });
  } catch (error) {
    next(error);
  }
};

// Admin local transfer
export const adminTransferFunds = async (req, res, next) => {
  try {
    const transfer = await transactionService.transferFunds(
      req.params.userId,
      req.body,
      {
        bypassPin: true,
        sendEmails: false,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Transfer successful.",
      data: transfer,
    });
  } catch (error) {
    next(error);
  }
};

// Get recipient account
export const getTransferRecipient = async (req, res, next) => {
  try {
    const { accountNumber } = req.query;

    const recipient =
      await transactionService.getTransferRecipient(accountNumber);

    return res.status(200).json({
      success: true,
      message: "Recipient found successfully.",
      data: recipient,
    });
  } catch (error) {
    next(error);
  }
};

// International transfer
export const internationalTransfer = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transaction = await transactionService.internationalTransfer(
      userId,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message:
        "International transfer submitted successfully. Awaiting approval.",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// admin international transfer
export const adminInternationalTransfer = async (req, res, next) => {
  try {

    const transaction = await transactionService.internationalTransfer(
      req.params.userId,
      req.body,
      {
        bypassPin: true,
        sendEmails: false,
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "International transfer submitted successfully. Awaiting approval.",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// Deposit funds
export const depositFunds = async (req, res, next) => {
  try {
    const deposit = await transactionService.depositFunds(
      req.user._id,
      req.body,
      req.file,
    );

    res.status(201).json({
      success: true,
      message: "Deposit submitted successfully.",
      data: deposit,
    });
  } catch (error) {
    next(error);
  }
};

// Approve Deposit
export const approveDeposit = async (req, res, next) => {
  try {
    const { depositId } = req.params;

    const approvedDeposit = await transactionService.approveDeposit(depositId);

    return res.status(200).json({
      success: true,
      message: "Deposit approved successfully.",
      data: approvedDeposit,
    });
  } catch (error) {
    next(error);
  }
};

// Get transaction history
export const getTransactionHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const transactionHistory =
      await transactionService.getTransactionHistory(userId);

    return res.status(200).json({
      success: true,
      message: "Transaction history retrieved successfully.",
      data: transactionHistory,
    });
  } catch (error) {
    next(error);
  }
};

// approve transaction
export const confirmTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    const transaction = await transactionService.confirmTransaction(transactionId);

    return res.status(200).json({
      success: true,
      message: "Transaction Approved successfully.",
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};


// Reject Trasaction
export const rejectTransaction = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    await transactionService.rejectTransaction(transactionId);

    return res.status(200).json({
      success: true,
      message: "Transaction rejected successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Delete transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    await transactionService.deleteTransaction(
      req.params.transactionId
    );

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};