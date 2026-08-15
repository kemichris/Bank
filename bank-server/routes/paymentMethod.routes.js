import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/upload.middleware.js";

import * as paymentMethodController from "../controllers/paymentMethod.controller.js";

const router = express.Router();

// create payment method
router.post(
  "/create",
  protect,
  authorize("admin"),
  upload.single("qrCode"),
  paymentMethodController.createPaymentMethod,
);

// Get payment methods
router.get(
  "/",
  protect,
  authorize("user", "admin"),
  paymentMethodController.getPaymentMethods,
);

// Get by id
router.get(
  "/:id",
  protect,
  authorize("admin"),
  paymentMethodController.getPaymentMethod,
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("qrCode"),
  paymentMethodController.updatePaymentMethod,
);

router.patch(
  "/:methodId/toggle",
  protect,
  authorize("admin"),
  paymentMethodController.togglePaymentMethodStatus,
);

router.delete(
  "/:methodId",
  protect,
  authorize("admin"),
  paymentMethodController.deletePaymentMethod,
);

export default router;
