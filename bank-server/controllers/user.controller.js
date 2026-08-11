import * as userService from "../services/user.service.js";

// Get logged-in user's profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await userService.getProfile(userId);

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully.",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// update profile Image
export const updateProfileImage = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await userService.updateProfileImage(userId, req.file);

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully.",
      data: result,
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
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Change Transaction pin
export const changeTransactionPin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { currentPin, newPin } = req.body;

    await userService.changeTransactionPin(userId, currentPin, newPin);

    return res.status(200).json({
      success: true,
      message: "Pin changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// verify email
export const verifyEmail = async (req, res, next) => {
  try {
    await userService.verifyEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// resend email verification code
export const resendVerificationCode = async (req, res, next) => {
  try {
    await userService.resendVerificationCode(req.body.email);

    res.status(200).json({
      success: true,
      message: "A new verification code has been sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

// Get email verification status
export const getEmailVerificationStatus = async (req, res, next) => {
  try {
    const emailVerified = await userService.getEmailVerificationStatus(
      req.query.email,
    );

    res.status(200).json({
      success: true,
      data: {
        emailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Dashboard
export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const dashboardData = await userService.getDashboardData(userId);

    return res.status(200).json({
      success: true,
      message: "Dashboard data retrieved",
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};
