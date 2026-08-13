import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import * as adminController from "../controllers/admin.controller.js";
import { adminTransferFunds } from "../controllers/transaction.controller.js";

const router = express.Router();

// Load dashboard data
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  adminController.getAdminDashboard,
);

// Get all users
router.get("/users", protect, authorize("admin"), adminController.getAllUsers);

// Get user by id
router.get(
  "/users/:userId",
  protect,
  authorize("admin"),
  adminController.getUserById,
);

// Toggle suspension
router.patch(
  "/users/:userId/suspension",
  protect,
  authorize("admin"),
  adminController.toggleSuspension,
);

// Toggle user status
router.patch(
  "/users/:userId/status",
  protect,
  authorize("admin"),
  adminController.toggleUserStatus,
);

// Debit or Credit user
router.post(
  "/users/:userId/credit-debit",
  protect,
  authorize("admin"),
  adminController.creditDebitUser,
);

router.post(
  "/users/:userId/transfer",
  protect,
  authorize('admin'),
  adminTransferFunds
);

export default router;
