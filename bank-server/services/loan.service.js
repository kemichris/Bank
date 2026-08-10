import Loan from '../models/loan.model.js';
import Account from "../models/account.model.js";
import ApiError from "../utils/apiError.utils.js";

export const applyForLoan = async (userId, loanData) => {
    const {
        requestedAmount,
        duration,
        creditFacility,
        purpose,
        monthlyNetIncome
    } = loanData;

    // -----------------------------------------
    // 1. Validate loan amount
    // -----------------------------------------

    if (
        typeof loanAmount !== 'number' ||
        !Number.isFinite(loanAmount) ||
        loanAmount <= 0
    ) {
        throw new ApiError(
            400,
            'Please provide a valid loan amount.'
        );
    }

    // -----------------------------------------
    // 2. Validate duration
    // -----------------------------------------

    const allowedDurations = [6, 12, 24, 36, 48, 60];

    if (!allowedDurations.includes(duration)) {
        throw new ApiError(
            400,
            'Invalid loan duration.'
        );
    }

    // -----------------------------------------
    // 3. Validate credit facility
    // -----------------------------------------

    if (!creditFacility?.trim()) {
        throw new ApiError(
            400,
            'Credit facility is required.'
        );
    }

    // -----------------------------------------
    // 4. Validate purpose
    // -----------------------------------------

    if (!purpose?.trim()) {
        throw new ApiError(
            400,
            'Loan purpose is required.'
        );
    }

    // -----------------------------------------
    // 5. Validate monthly income
    // -----------------------------------------

    if (
        typeof monthlyNetIncome !== 'number' ||
        !Number.isFinite(monthlyNetIncome) ||
        monthlyNetIncome < 0
    ) {
        throw new ApiError(
            400,
            'Please provide a valid monthly net income.'
        );
    }

    // -----------------------------------------
    // 6. Find user's account
    // -----------------------------------------

    const account = await Account.findOne({
        owner: userId,
        status: 'active'
    });

    if (!account) {
        throw new ApiError(
            404,
            'Active account not found.'
        );
    }

    // -----------------------------------------
    // 7. Check existing loan applications
    // -----------------------------------------

    const existingLoan = await Loan.findOne({
        owner: userId,
        status: {
            $in: ['pending', 'approved', 'active']
        }
    });

    if (existingLoan) {
        throw new ApiError(
            400,
            'You already have an active loan application or loan.'
        );
    }

    // -----------------------------------------
    // 8. Create loan application
    // -----------------------------------------

    const loan = await Loan.create({
        owner: userId,
        account: account._id,

        loanAmount,
        duration,
        creditFacility,
        purpose: purpose.trim(),
        monthlyNetIncome,

        status: 'pending'
    });

    // -----------------------------------------
    // 9. Return application details
    // -----------------------------------------

    return {
        loanId: loan._id,
        loanAmount: loan.loanAmount,
        duration: loan.duration,
        creditFacility: loan.creditFacility,
        purpose: loan.purpose,
        monthlyNetIncome: loan.monthlyNetIncome,
        status: loan.status,
        createdAt: loan.createdAt
    };
};