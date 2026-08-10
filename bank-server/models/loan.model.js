import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
    {
        // User who applied for the loan
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Account associated with the loan
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },

        // Amount requested by the user
        requestedAmount: {
            type: Number,
            required: true,
            min: 1
        },

        // Amount approved by admin
        approvedAmount: {
            type: Number,
            default: null
        },

        // Purpose of the loan
        purpose: {
            type: String,
            required: true,
            trim: true
        },

        // Loan duration
        term: {
            type: Number,
            required: true,
            min: 1
        },

        // Duration unit
        termUnit: {
            type: String,
            enum: ['days', 'months', 'years'],
            default: 'months'
        },

        // Interest rate
        interestRate: {
            type: Number,
            default: 0,
            min: 0
        },

        // Total amount the user is expected to repay
        totalRepayment: {
            type: Number,
            default: null
        },

        // Amount already repaid
        amountRepaid: {
            type: Number,
            default: 0,
            min: 0
        },

        // Remaining amount to repay
        remainingBalance: {
            type: Number,
            default: null,
            min: 0
        },

        // Loan status
        status: {
            type: String,
            enum: [
                'pending',
                'approved',
                'rejected',
                'active',
                'completed',
                'defaulted',
                'cancelled'
            ],
            default: 'pending'
        },

        // Admin who reviewed the application
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },

        reviewedAt: {
            type: Date,
            default: null
        },

        // Reason if rejected
        rejectionReason: {
            type: String,
            default: ''
        },

        // When the approved loan was deposited
        disbursedAt: {
            type: Date,
            default: null
        },

        // Expected repayment completion date
        dueDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;