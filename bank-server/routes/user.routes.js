import express from "express";
import {
  getProfile,
  changePassword,
  getDashboardData,
  changeTransactionPin,
  updateProfileImage
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { changePasswordSchema } from "../validators/user.validator.js";

const router = express.Router();

// Get logged-in user's profile
router.get("/profile", protect, authorize("user"), getProfile);

// update profile image
router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage,
);

// Change password
router.put(
  "/change-password",
  protect,
  authorize("user"),
  validate(changePasswordSchema),
  changePassword,
);

// Change transaction pin
router.put("/change-pin", protect, authorize("user"), changeTransactionPin);

// Load dashboard data
router.get("/dashboard", protect, authorize("user"), getDashboardData);

export default router;
