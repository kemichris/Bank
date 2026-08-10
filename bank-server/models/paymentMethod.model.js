import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
// BTC, ETH, Bank Transfer, USDT....
    name: {
        type: String,
        required: true,
        trim: true
    },

    // bitcoin, ethereum, erc20, trc20
    network: {
        type: String,
        default: ''

    },
    
    // crypto | bank
    type: {
        type: String,
        enum: ["crypto", "bank", "card"],
        required: true
    },

    // Wallet address
    walletAddress: {
        type: String,
        default: '',
        trim: true
    },

    accountNumber: {
        type: String,
        default: '',
        trim: true
    },

    // Optional account holder
    accountName: {
        type: String,
        default: ""
    },

    // Optional bank name
    bankName: {
        type: String,
        default: ""
    },

    // optional swift code 
    swiftCode: {
        type: String,
        default: ''
    },

    // Used for displaying logo
    icon: {
        type: String,
        default: ""
    },

    qrCode: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    },

    instructions: {
        type: String,
        default: ""
    },
}, { timestamps: true }
);
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;