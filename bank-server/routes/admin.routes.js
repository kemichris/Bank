import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import {
  getAdminDashboard,
  getAllUsers,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Load dashboard data
router.get("/dashboard", protect, authorize("admin"), getAdminDashboard);

// Get all users
router.get("/users", protect, authorize("admin"), getAllUsers);

export default router;
