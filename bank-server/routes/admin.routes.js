import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import * as adminController from "../controllers/admin.controller.js";
import { adminTransferFunds, adminInternationalTransfer } from "../controllers/transaction.controller.js";

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

// Verify user email 
router.patch(
    '/users/:userId/verify-email',
    protect,
    authorize('admin'),
    adminController.verifyUserEmail
);

// Verify Kyc
router.patch(
    '/users/:userId/verify-kyc',
    protect,
    authorize('admin'),
    adminController.VerifyUserKyc
);

// Reset user password to default
router.patch(
    '/users/:userId/reset-password',
    protect,
    authorize('admin'),
    adminController.resetUserPassword
);

// Delet user 
router.delete(
  '/users/:userId',
  protect,
  authorize('admin'),
  adminController.deleteUser
);

// Debit or Credit user
router.post(
  "/users/:userId/credit-debit",
  protect,
  authorize("admin"),
  adminController.creditDebitUser,
);

// local transfer
router.post(
  "/users/:userId/transfer",
  protect,
  authorize('admin'),
  adminTransferFunds
);

// internationa transfer 
router.post(
  "/users/:userId/international-transfer",
  protect,
  authorize('admin'),
  adminInternationalTransfer
);



export default router;
