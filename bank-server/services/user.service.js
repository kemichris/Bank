import { email } from 'zod';
import User from '../models/user.model.js';
import ApiError from '../utils/apiError.utils.js';
import { comparePassword } from '../utils/password.utils.js';


// Get logged-in user's profile
export const getProfile = async (userId) => {
    const user = await User.findById(userId)
        .populate('role')
        .populate('account')
        .select('-password -otp -otpExpiry -passwordResetToken -passwordResetExpires');

    if (!user) {
        throw new ApiError(404, 'User not found.');
    }

    return user;
};

// change password 
export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, 'User not found.');
    }

    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
        throw new ApiError(400, 'Current password is incorrect.');
    }

    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();
};

// verify email
export const verifyEmail = async (emailData) => {
    const { email, verificationCode } = emailData;

    try {
        if (!email || !verificationCode) {
            throw new ApiError(
                400,
                'Email and verification code are required'
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (user.emailVerified) {
            throw new ApiError(400, 'Email is already verified');
        }

        // Check expiry
        if (
            !user.emailVerificationExpires ||
            user.emailVerificationExpires < Date.now()
        ) {
            throw new ApiError(400, 'Verification code has expired');
        }

        // Check code match
        if (user.emailVerificationCode !== verificationCode) {
            throw new ApiError(400, 'Invalid verification code');
        }

        // Verify email
        user.emailVerified = true;
        user.emailVerificationCode = undefined;
        user.emailVerificationExpires = undefined;

        await user.save();

    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        console.error(error);

        throw new ApiError(
            500,
            error.message
        );
    }
};