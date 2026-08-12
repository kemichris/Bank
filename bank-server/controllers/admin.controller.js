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
      success:true,
      data,
    })
  } catch (error) {
    next(error)
  }
}
