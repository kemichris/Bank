import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
    {
        // Card owner
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Linked account
        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true
        },

        // Card number (encrypted or tokenized in production)
        cardNumber: {
            type: String,
            unique: true,
            sparse: true
        },

        // Encrypted CVV
        cvv: {
            type: String,
            sparse: true
        },

        pin: {
            type: String,
            sparse: true
        },

        // Last four digits (for displaying to users)
        last4: {
            type: String,
            sparse: true
        },

        // Card holder name
        cardHolderName: {
            type: String,
            required: true,
            trim: true
        },

        // Card network
        brand: {
            type: String,
            enum: ['Visa', 'Mastercard', 'Amex'],
            required: true
        },

        // Physical or virtual card
        type: {
            type: String,
            enum: ['virtual', 'physical'],
            default: 'virtual'
        },

        // Expiry month
        expiryMonth: {
            type: Number,
            sparse: true,
            min: 1,
            max: 12
        },

        // Expiry year
        expiryYear: {
            type: Number,
            sparse: true
        },

        // Card status
        status: {
            type: String,
            enum: [
                'pending',
                'active',
                'blocked',
                'expired',
                'cancelled'
            ],
            default: 'pending'
        },

        // Card spending limit
        spendingLimit: {
            type: Number,
            default: 100
        },

        // Whether online payments are enabled
        onlinePayments: {
            type: Boolean,
            default: true
        },

        // Whether ATM withdrawals are enabled
        atmWithdrawal: {
            type: Boolean,
            default: true
        },

        // Whether international transactions are enabled
        internationalPayments: {
            type: Boolean,
            default: false
        },

        // Card freeze state
        isFrozen: {
            type: Boolean,
            default: false
        },
        blockedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        blockedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Card = mongoose.model('Card', cardSchema);

export default Card;