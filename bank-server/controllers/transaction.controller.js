import * as transactionService from '../services/transaction.service.js';

// Transfer funds
export const transferFunds = async (req, res, next) => {
    try {
        const transfer = await transactionService.transferFunds(
            req.user._id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: 'Transfer successful.',
            data: transfer
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
            req.file
        );

        res.status(201).json({
            success: true,
            message: 'Deposit submitted successfully.',
            data: deposit
        });

    } catch (error) {
        next(error);
    }
};

// Approve Deposit
export const approveDeposit = async (req, res, next) => {
    try {
        const { depositId } = req.params;

        const approvedDeposit =
            await transactionService.approveDeposit(depositId);

        return res.status(200).json({
            success: true,
            message: 'Deposit approved successfully.',
            data: approvedDeposit
        });

    } catch (error) {
        next(error);
    }
};

// Get transaction history
// Get transaction history
export const getTransactionHistory = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const transactionHistory =
            await transactionService.getTransactionHistory(userId);

        return res.status(200).json({
            success: true,
            message: 'Transaction history retrieved successfully.',
            data: transactionHistory
        });

    } catch (error) {
        next(error);
    }
};