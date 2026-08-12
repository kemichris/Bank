import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware";

import { getAdminDashboard } from "../controllers/admin.controller";


const router = express.Router()

// Load dashboard data
router.get("/dashboard", protect, authorize("admin"), getAdminDashboard);

export default router