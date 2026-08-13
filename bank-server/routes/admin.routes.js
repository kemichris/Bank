import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import * as adminController from "../controllers/admin.controller.js";

const router = express.Router();

// Load dashboard data
router.get("/dashboard", protect, authorize("admin"), adminController.getAdminDashboard);

// Get all users
router.get("/users", protect, authorize("admin"), adminController.getAllUsers);

// Get user by id
router.get("/users/:userId", protect, adminOnly, adminController.getUserById);

export default router;
