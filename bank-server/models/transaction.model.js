import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        // The owner of this transaction record
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // The owner's account involved in the transaction
        ownerAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },

        // The other user involved in the transaction
        counterParty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // The other account involved in the transaction
        counterPartyAccount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            default: null,
        },

        amount: {
            type: Number,
            required: true,
            min: 1,
        },

        type: {
            type: String,
            enum: [
                'transfer',
                'international_transfer',
                'deposit',
                'withdrawal',
                'bank_charge'
            ],
            required: true,
        },

        // Is this transaction a debit or credit from the OWNER'S perspective?
        direction: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },

        internationalDetails: {
            beneficiaryAccountName: String,
            beneficiaryAccountNumber: String,
            bankName: String,
            bankAddress: String,
            accountType: String,
            country: String,
            iban: String,
            swiftCode: String
        },

        reference: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },
        method: { type: String, required: true },
        receipt: {
            type: String,
            default: null,
        },
        receiptPublicId: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: [
                'pending',
                'processing',
                'completed',
                'failed',
                'rejected',
                'reversed'
            ],
            default: 'pending',
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },

        reviewedAt: {
            type: Date,
            default: null,
        },

        rejectionReason: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
