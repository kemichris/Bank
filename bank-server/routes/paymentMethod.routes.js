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

router.get(
  "/",
  protect,
  authorize("user", "admin"),
  paymentMethodController.getPaymentMethods,
);

router.delete(
  "/:methodId",
  protect,
  authorize("admin"),
  paymentMethodController.deletePaymentMethod,
);

export default router;
