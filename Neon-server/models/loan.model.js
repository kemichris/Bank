import mongoose from "mongoose";


const loanSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 1000
        },
        interestRate: {
            type: Number,
            required: true
        },
        term: {
            type: Number,
            required: true
        },
        monthlyPayment: {
            type: Number,
            default: null
        },
        totalRepayment: {
            type: Number,
            default: null
        },
        purpose: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: [
                'pending',
                'approved',
                'rejected',
                'active',
                'paid',
                'defaulted'
            ],
            default: 'pending'
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        approvedAt: {
            type: Date,
            default: null
        },
        rejectionReason: {
            type: String,
            default: null
        },
        disbursedAt: {
            type: Date,
            default: null
        },
        nextPaymentDate: {
            type: Date,
            default: null
        },
        remainingBalance: {
            type: Number,
            default: null
        },
        disbursementTransaction: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;