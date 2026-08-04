import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            default: null
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active'
        },
        otp: {
            type: String,
            default: null
        },
        otpExpiry: {
            type: Date,
            default: null
        },
        lastLogin: {
            type: Date,
            default: null
        },
        passwordChangedAt: {
            type: Date,
            default: null
        },
        passwordResetToken: {
            type: String,
            default: null
        },
        passwordResetExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,

        toJSON: {
            virtuals: true
        },

        toObject: {
            virtuals: true
        }
    }
);

// Virtual relationship between User and Account
userSchema.virtual('account', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'owner',
    justOne: true
});

const User = mongoose.model('User', userSchema);

export default User;