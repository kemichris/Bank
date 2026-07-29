import User from '../models/user.model.js';
import ApiError from '../utils/apiError.utils.js';
import {comparePassword} from '../utils/password.utils.js';


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