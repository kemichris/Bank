import Loan from '../models/loan.model.js';
import Account from "../models/account.model.js";
import ApiError from "../utils/apiError.utils.js";


// apply for loans 
export const applyForLoan = async (userId, loanData) => {
    const {
        requestedAmount,
        term,
        creditFacility,
        purpose,
        monthlyNetIncome
    } = loanData;

    // -----------------------------------------
    // 1. Validate loan amount
    // -----------------------------------------

    if (
        typeof requestedAmount !== 'number' ||
        !Number.isFinite(requestedAmount) ||
        requestedAmount <= 0
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

    if (!allowedDurations.includes(term)) {
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

        requestedAmount,
        term,
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
        requestedAmount: loan.requestedAmount,
        term: loan.term,
        creditFacility: loan.creditFacility,
        purpose: loan.purpose,
        monthlyNetIncome: loan.monthlyNetIncome,
        status: loan.status,
        createdAt: loan.createdAt
    };
};

// Get loans
export const getAllLoans = async () => {
    const loans = await Loan.find()
    .populate('owner', 'firstName lastName')
    .sort({createdAt: -1})

    return loans
}

export const getLoan = async (loanId) => {
    const loan = await Loan.findById({loanId})
    .populate('owner', 'firstName lastName')
    .sort({createdAt: -1})

    if (!loan) {
        throw new ApiError(404, "Loan application  not found.");
    }

    return loan
}