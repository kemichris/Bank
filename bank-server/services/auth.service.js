import mongoose from "mongoose";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import Account from "../models/account.model.js";

import ApiError from "../utils/apiError.utils.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { generateAccountNumber } from "../utils/account.utils.js";
import { fromSmallestUnit } from "../utils/money.utils.js";
import { generateAccessToken, generateResetToken } from "../utils/jwt.utils.js";
import generateCode from "../utils/generateCode.utils.js";
import { sendOtpEmail, sendPasswordResetMail } from "./mail.service.js";
import { resendVerificationCode } from "./user.service.js";

// user registration service
export const register = async (userData) => {
  const {
    firstName,
    lastName,
    middleName,
    username,
    email,
    transactionPin,
    phoneNumber,
    dateOfBirth,
    country,
    password,
    accountType,
  } = userData;

  const [existingEmail, existingPhone] = await Promise.all([
    User.findOne({ email }),
    User.findOne({ phoneNumber }),
  ]);

  if (existingEmail) {
    throw new ApiError(409, "Email already exists.");
  }
  if (existingPhone) {
    throw new ApiError(409, "Phone number already exists.");
  }

  // Find default user role
  const userRole = await Role.findOne({ name: "user" });

  if (!userRole) {
    throw new ApiError(500, "Default user role not found.");
  }

  const accountName = `${firstName} ${lastName}`.trim();

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Hash pin
  const hashedPin = await hashPassword(transactionPin);

  // Generate 6-digit verification code
  const verificationCode = generateCode();

  // Start MongoDB session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create user
    const user = new User({
      firstName,
      lastName,
      middleName,
      username,
      email,
      phoneNumber,
      dateOfBirth,
      country,
      password: hashedPassword,
      transactionPin: hashedPin,
      accountType,
      role: userRole._id,
      emailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      emailVerificationLastSent: new Date(), // track when code was sent
    });

    await user.save({ session });

    // Generate account number
    const accountNumber = await generateAccountNumber(session);

    // Create account
    const account = new Account({
      owner: user._id,
      accountName: accountName,
      accountNumber,
      accountType: accountType,
    });

    await account.save({ session });

    // Save everything
    await session.commitTransaction();

    sendOtpEmail(user.email, user.firstName, verificationCode).catch((err) => {
      console.error("Email failed:", err);
    });

    return {
      email: user.email,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

// user login service
export const login = async (userData) => {
  const { email, password } = userData;

  // Find user by email
  const user = await User.findOne({ email }).populate("role");

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Compare password
  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  if (!user.emailVerified) {
    try {
      await resendVerificationCode(user.email);
    } catch (error) {
      // If a code was sent within the last 60 seconds,
      // don't stop the login flow because of the cooldown.
      if (error.statusCode !== 429) {
        throw error;
      }
    }

    throw new ApiError(403, "Email verification required.");
  }

  // Generate access token
  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role.name,
  });

  // Update last login
  user.lastLogin = new Date();

  await user.save();

  return {
    accessToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role.name,
      profileImage: user.profileImage
    },
  };
};

// Password reset
export const forgotPassword = async (email) => {
  const normalizedEmail = email?.toLowerCase().trim();

  if (!normalizedEmail) {
    throw new ApiError(400, "Email is required.");
  }

  const user = await User.findOne({
    email: normalizedEmail,
  });

  /*
        Don't reveal whether the email belongs
        to an account.
    */
  if (!user) {
    return {
      message:
        "If an account with that email exists, a reset code has been sent.",
    };
  }

  const resetCode = generateCode();

  user.resetPasswordCode = resetCode;

  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  user.passwordChangedAt = Date.now();

  await user.save();

  const fullName = `${user.firstName} ${user.lastName}`;

  await sendPasswordResetMail(user.email, fullName, resetCode);

  return {
    message:
      "If an account with that email exists, a reset code has been sent.",
  };
};

// verify rest code
export const verifyResetCode = async (email, code) => {
    const normalizedEmail =
        email?.toLowerCase().trim();

    if (!normalizedEmail || !code) {
        throw new ApiError(
            400,
            'Email and verification code are required.'
        );
    }

    const user = await User.findOne({
        email: normalizedEmail,
        resetPasswordCode: code,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    });

    if (!user) {
        throw new ApiError(
            400,
            'Invalid or expired verification code.'
        );
    }

    /*
        The code has now been successfully verified.

        Consume it immediately so it cannot be reused.
    */
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;

    await user.save();

    /*
        Create a temporary token that can ONLY
        be used for password resetting.
    */
    const resetToken = generateResetToken({
        id: user._id,
        purpose: 'password-reset'
    });

    return {
        resetToken
    };
};

export const resetPassword = async (
    userId,
    newPassword
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(
            404,
            'User not found.'
        );
    }

    const hashedPassword =
        await hashPassword(newPassword);

    user.password = hashedPassword;

    user.passwordChangedAt = Date.now();

    /*
        Make sure there is no remaining
        password-reset code.
    */
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;

    await user.save();

    return {
        message:
            'Password reset successful. You can now log in.'
    };
};
