import * as userService from '../services/user.service.js';


// Get logged-in user's profile
export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const profile = await userService.getProfile(userId);

        return res.status(200).json({
            success: true,
            message: "User profile retrieved successfully.",
            data: profile
        });

    } catch (error) {
        next(error);
    }
};

// Change password
export const changePassword = async (req, res, next) => {
    try {
        const userId = req.user._id; 
        const { currentPassword, newPassword } = req.body;

        await userService.changePassword(userId, currentPassword, newPassword);

        return res.status(200).json({
            success: true,
            message: 'Password changed successfully.'
        });

    } catch (error) {
        next(error);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        await userService.verifyEmail(req.body);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully.'
        });

    } catch (error) {
        next(error);
    }
};

export const resendVerificationCode = async (req, res, next) => {
    try {
        await userService.resendVerificationCode(req.body.email);

        res.status(200).json({
            success: true,
            message: 'A new verification code has been sent to your email.'
        });

    } catch (error) {
        next(error);
    }
};