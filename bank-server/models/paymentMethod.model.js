import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    network: {
        type: String,
        required: true,
        trim: true
    },
    walletAddress: {
        type: String,
        required: true,
        trim: true
    },
    qrCode: {
        type: String,
        default: ''
    },
    icon: {
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
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;