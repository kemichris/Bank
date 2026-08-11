import { email } from "zod";
import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import ApiError from "../utils/apiError.utils.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import generateCode from "../utils/generateCode.utils.js";
import { sendOtpEmail } from "./mail.service.js";

// Get logged-in user's profile
export const getProfile = async (userId) => {
  const user = await User.findById(userId)
    .populate("account", "accountNumber")
    .select(
      "-password -otp -otpExpiry -passwordResetToken -passwordResetExpires -transactionPin -passwordChangedAt",
    );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

// Upload profile photo
export const updateProfileImage = async (userId, imageFile) => {
  
  if (!imageFile) {
    throw new ApiError(400, "Profile image is required.");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  let uploadedImage;

  try {
    uploadedImage = await uploadImage(imageFile.buffer, "neon/profile-images");
  } catch (error) {
    console.error(
        'CLOUDINARY PROFILE IMAGE ERROR:',
        error
    );
    throw new ApiError(500, "Unable to upload profile image.");
  }


  const oldPublicId = user.profileImagePublicId;

  user.profileImage = uploadedImage.secure_url;

  user.profileImagePublicId = uploadedImage.public_id;

  await user.save();

  // -----------------------------------------
  // 5. Delete old image
  // -----------------------------------------

  if (oldPublicId) {
    try {
      await deleteImage(oldPublicId);
    } catch (error) {
      /*
                The new image has already been saved
                successfully, so don't fail the request
                just because the old Cloudinary image
                could not be deleted.
            */

      console.error("Failed to delete old profile image:", error.message);
    }
  }

  // -----------------------------------------
  // 6. Return updated image
  // -----------------------------------------

  return {
    profileImage: user.profileImage,
  };
};

// change password
export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isMatch = await comparePassword(currentPassword, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect.");
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  user.passwordChangedAt = Date.now();

  await user.save();
};

// Change tansaction pin
export const changeTransactionPin = async (userId, currentPin, newPin) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const isMatch = await comparePassword(currentPin, user.transactionPin);

  if (!isMatch) {
    throw new ApiError(400, "Current Pin is incorrect.");
  }

  const hashedPin = await hashPassword(newPin);

  user.transactionPin = hashedPin;

  await user.save();
};

// verify email
export const verifyEmail = async (emailData) => {
  const { email, verificationCode } = emailData;

  try {
    if (!email || !verificationCode) {
      throw new ApiError(400, "Email and verification code are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
      throw new ApiError(400, "Email is already verified");
    }

    // Check expiry
    if (
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < Date.now()
    ) {
      throw new ApiError(400, "Verification code has expired");
    }

    // Check code match
    if (user.emailVerificationCode !== verificationCode) {
      throw new ApiError(400, "Invalid verification code");
    }

    // Verify email
    user.emailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error(error);

    throw new ApiError(500, error.message);
  }
};

// RESEND EMAIL VERIFICATION CODE
export const resendVerificationCode = async (email) => {
  try {
    if (!email) {
      throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
      throw new ApiError(400, "Email is already verified");
    }

    // Prevent spam requests
    if (user.emailVerificationLastSent) {
      const secondsSinceLastRequest =
        (Date.now() - user.emailVerificationLastSent.getTime()) / 1000;

      if (secondsSinceLastRequest < 60) {
        const remaining = Math.ceil(60 - secondsSinceLastRequest);

        throw new ApiError(
          429,
          `Please wait ${remaining} seconds before requesting another code`,
        );
      }
    }

    const verificationCode = generateCode();

    await sendOtpEmail(user.email, user.firstName, verificationCode);

    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.emailVerificationLastSent = new Date();

    await user.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error(error);

    throw new ApiError(500, "Failed to resend verification code.");
  }
};

// Check email verification status
export const getEmailVerificationStatus = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user.emailVerified;
};

// Dashboard data
export const getDashboardData = async (userId) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [user, primaryAccount, monthlyStats, recentTransactions] =
    await Promise.all([
      // User details
      User.findById(userId).select(
        "firstName lastName email username kycStatus",
      ),

      // Primary account
      Account.findOne({
        owner: userId,
        isPrimary: true,
      }).select(
        "accountName accountNumber accountType balance status limit isPrimary",
      ),

      // Monthly credit and debit
      Transaction.aggregate([
        {
          $match: {
            owner: userId,
            status: "completed",
            createdAt: {
              $gte: startOfMonth,
            },
          },
        },
        {
          $group: {
            _id: "$direction",
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),

      // Last 5 transactions
      Transaction.find({
        owner: userId,
        status: "completed",
      })
        .populate("counterParty", "firstName lastName")
        .populate("counterPartyAccount", "accountNumber")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

  // Get credit amount
  const monthlyCredit =
    monthlyStats.find((item) => item._id === "credit")?.total || 0;

  // Get debit amount
  const monthlyDebit =
    monthlyStats.find((item) => item._id === "debit")?.total || 0;

  // Total credit + debit
  const totalVolume = monthlyCredit + monthlyDebit;

  return {
    user,
    account: primaryAccount,
    statistics: {
      monthlyCredit,
      monthlyDebit,
      totalVolume,
    },
    recentTransactions,
  };
};
