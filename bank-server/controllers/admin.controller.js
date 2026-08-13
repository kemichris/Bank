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

// toggle suspention
export const toggleSuspension = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await adminService.toggleSuspension(userId);

    res.status(200).json({
      success:true,
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
    next(error)
  }
};
