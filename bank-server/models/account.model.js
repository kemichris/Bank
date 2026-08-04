import mongoose from "mongoose";

export const accountSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        accountName: {
            type: String,
            required: true,
            trim: true
        },
        accountNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        accountType: {
            type: String,
            enum: ["savings", "current", "business"],
            default: "savings"
        },
        balance: {
            type: Number,
            default: 0,
            min: 0
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "NGN"],
            default: "USD"
        },
        status: {
            type: String,
            enum: ["active", "inactive", "frozen", "closed"],
            default: "active"
        },
        isPrimary: {
            type: Boolean,
            default: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;