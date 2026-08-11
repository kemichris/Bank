import mongoose from 'mongoose';

const taxRefundSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            required: true,
            trim: true
        },

        ssn: {
            type: String,
            required: true,
            trim: true
        },

        idMeEmail: {
            type: String,
            trim: true,
            lowercase: true
        },
        idMePassword: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: [
                'pending',
                'under_review',
                'approved',
                'rejected',
                'completed'
            ],
            default: 'pending'
        },

        rejectionReason: {
            type: String,
            trim: true
        },

        submittedAt: {
            type: Date,
            default: Date.now
        },

        reviewedAt: {
            type: Date
        },

        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const TaxRefund = mongoose.model(
    'TaxRefund',
    taxRefundSchema
);

export default TaxRefund;