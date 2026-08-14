import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  transferSchema,
  depositSchema,
} from "../validators/transaction.validator.js";

import {
  transferFunds,
  getTransferRecipient,
  internationalTransfer,
  depositFunds,
  getTransactionHistory,
  rejectTransaction,
  deleteTransaction,
  confirmTransaction,
} from "../controllers/transaction.controller.js";

const router = express.Router();

// Transfer funds route(local)
router.post(
  "/transfer",
  protect,
  authorize("user"),
  validate(transferSchema),
  transferFunds,
);

// confirm transfer recipient
router.get("/recipient", protect, authorize("user"), getTransferRecipient);

// international transfer
router.post(
  "/international-transfer",
  protect,
  authorize("user"),
  internationalTransfer,
);

// deposit funds route
router.post(
  "/deposit",
  protect,
  authorize("user"),
  upload.single("receipt"),
  validate(depositSchema),
  depositFunds,
);

// // approve deposit
// router.patch(
//   "/deposit/:depositId/approve",
//   protect,
//   authorize("admin", "manager", "superadmin"),
//   approveDeposit,
// );

// Get transaction history
router.get("/history", protect, authorize("user"), getTransactionHistory);

// Approve Transaction
router.patch(
  "/:transactionId/confirm",
  protect,
  authorize("admin"),
  confirmTransaction,
);

// Reject Transaction
router.patch(
  "/:transactionId/reject",
  protect,
  authorize("admin"),
  rejectTransaction,
);

// Delete transacton 
router.delete('/:transactionId', protect, authorize('admin'), deleteTransaction)

export default router;
