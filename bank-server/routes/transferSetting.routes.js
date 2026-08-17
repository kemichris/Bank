import express from "express";

import * as transferSettingController from "../controllers/transferSetting.controller.js";

import { protect, authorize } from '../middlewares/auth.middleware.js'

const router = express.Router();

router.patch(
  "/charge",
  protect,
  authorize("admin"),
  transferSettingController.updateTransferCharge,
);

export default router;
