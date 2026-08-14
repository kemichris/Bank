import * as adminService from "../services/admin.service.js";

// get admin dashboard data
export const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await adminService.getAdminDashboard();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users Info
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await adminService.getAllUsers();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await adminService.getUserById(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// update user
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const updatedUser = await adminService.updateUser(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// toggle suspention
export const toggleSuspension = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await adminService.toggleSuspension(userId);

    res.status(200).json({
      success: true,
      message:
        user.status === "active"
          ? "User account activated successfully."
          : "User account suspended successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// toggle user status
export const toggleUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await adminService.toggleUserStatus(userId);

    res.status(200).json({
      success: true,
      message:
        user.status === "active"
          ? "User account activated successfully."
          : "User account deactivated successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Verify Email
export const verifyUserEmail = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const verifiedEmail = await adminService.verifyUserEmail(userId);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: verifiedEmail,
    });
  } catch (error) {
    next(error);
  }
};

// verify Kyc
export const VerifyUserKyc = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const kycVerified = await adminService.VerifyUserKyc(userId);

    return res.status(200).json({
      success: true,
      message: "KYC verified successfully",
      data: kycVerified,
    });
  } catch (error) {
    next(error);
  }
};

// Reset user password to default
export const resetUserPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await adminService.resetUserPassword(userId);

    return res.status(200).json({
      success: true,
      message: `Temporay password reset successful to ${result.temporaryPassword}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await adminService.deleteUser(userId);

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Credit or debit user
export const creditDebitUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const transaction = await adminService.creditDebitUser(userId, req.body);

    res.status(201).json({
      success: true,
      message:
        transaction.direction === "credit"
          ? "Account credited succesfully"
          : "Account debited succesffuly",
    });
  } catch (error) {
    next(error);
  }
};
