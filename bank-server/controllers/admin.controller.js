import * as adminService from "../services/admin.service.js";

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
