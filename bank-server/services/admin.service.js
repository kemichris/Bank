import mongoose from "mongoose";
import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import Role from "../models/role.model.js";
import ApiError from "../utils/apiError.utils.js";
import { generateTransactionReference } from "../utils/transaction.utils.js";
import {
  hashPassword,
  generateTemporaryPassword,
} from "../utils/password.utils.js";
import { generateAccessToken } from "../utils/jwt.utils.js";

import { deleteImage } from "../utils/cloudinary.utils.js";

// Admin Dashboard Data
export const getAdminDashboard = async () => {
  const [
    totalUsers,
    totalAssetsResult,
    completedCreditsResult,
    completedDebitsResult,
    activeUsers,
    blockedUsers,
    pendingWithdrawals,
    pendingDeposits,
    recentTransactions,
  ] = await Promise.all([
    User.countDocuments(),

    Account.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$balance",
          },
        },
      },
    ]),

    Transaction.aggregate([
      {
        $match: {
          direction: "credit",
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    Transaction.aggregate([
      {
        $match: {
          direction: "debit",
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),

    User.countDocuments({
      status: "active",
    }),

    User.countDocuments({
      status: "suspended",
    }),

    Transaction.countDocuments({
      direction: "debit",
      status: "pending",
    }),

    Transaction.countDocuments({
      direction: "credit",
      status: "pending",
    }),

    Transaction.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("owner", "firstName lastName email")
      .populate("ownerAccount", "accountNumber")
      .populate("counterParty", "firstName lastName")
      .populate("counterPartyAccount", "accountNumber")
      .lean(),
  ]);

  return {
    totalUsers,

    totalAssets: totalAssetsResult[0]?.total || 0,

    completedCredits: completedCreditsResult[0]?.total || 0,

    completedDebits: completedDebitsResult[0]?.total || 0,

    activeUsers,

    blockedUsers,

    pendingWithdrawals,

    pendingDeposits,

    recentTransactions,
  };
};

// Get all users
export const getAllUsers = async () => {
  const userRole = await Role.findOne({
    name: "user",
  });

  const allUsers = await User.find({
    role: userRole._id,
  })
    .populate("role", "name")
    .populate("account", "accountNumber balance")
    .select("-password -verificationCode -resetPasswordCode")
    .sort({
      createdAt: -1,
    })
    .lean();

  return allUsers;
};

// Get user by id;
export const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .populate("role", "name")
    .populate("account")
    .select("-password -verificationCode -resetPasswordCode -transactionPin")
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const [depositStats, withdrawalStats] = await Promise.all([
    Transaction.aggregate([
      {
        $match: {
          owner: user._id,
          direction: "credit",
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),
    Transaction.aggregate([
      {
        $match: {
          owner: user._id,
          type: "withdrawal",
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]),
  ]);

  return {
    ...user,
    totalDeposits: depositStats[0]?.total || 0,
    totalWithdrawals: withdrawalStats[0]?.total || 0,
  };
};

// Update user
export const updateUser = async (userId, userData) => {
  const {
    firstName,
    lastName,
    middleName,
    username,
    email,
    phoneNumber,
    dateOfBirth,
    country,
  } = userData;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Prevent duplicate usernames
  if (username && username !== user.username) {
    const existingUsername = await User.findOne({
      username,
    });

    if (existingUsername) {
      throw new ApiError(409, "Username already exists.");
    }
  }

  // Prevent duplicate emails
  if (email && email !== user.email) {
    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail) {
      throw new ApiError(409, "Email already exists.");
    }
  }

  // Prevent duplicate phone numbers
  if (phoneNumber && phoneNumber !== user.phoneNumber) {
    const existingPhone = await User.findOne({
      phoneNumber,
    });

    if (existingPhone) {
      throw new ApiError(409, "Phone number already exists.");
    }
  }

  user.firstName = firstName ?? user.firstName;

  user.lastName = lastName ?? user.lastName;

  user.middleName = middleName ?? user.middleName;

  user.username = username ?? user.username;

  user.email = email ?? user.email;

  user.phoneNumber = phoneNumber ?? user.phoneNumber;

  user.dateOfBirth = dateOfBirth ?? user.dateOfBirth;

  user.country = country ?? user.country;

  await user.save();

  return user;
};

// Impersonate user
export const loginAsUser = async (
  adminId,
  userId
) => {
  // Find the admin
  const admin = await User.findById(
    adminId
  ).populate('role');

  if (!admin) {
    throw new ApiError(
      404,
      'Administrator not found.'
    );
  }

  // Only administrators can impersonate users
  if (
    ![
      'admin',
      'manager',
      'superadmin',
    ].includes(admin.role.name)
  ) {
    throw new ApiError(
      403,
      'Unauthorized.'
    );
  }

  // Find the target user
  const user = await User.findById(
    userId
  ).populate('role');

  if (!user) {
    throw new ApiError(
      404,
      'User not found.'
    );
  }

  // Prevent admins from impersonating themselves
  if (
    admin._id.toString() ===
    user._id.toString()
  ) {
    throw new ApiError(
      400,
      'You cannot impersonate yourself.'
    );
  }

  const accessToken =
    generateAccessToken({
      id: user._id,
      role: user.role.name,
      impersonatedBy: admin._id,
    });

  return {
    accessToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role.name,
      profileImage:
        user.profileImage,
    },
  };
};

// toggle account suspension
export const toggleSuspension = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.status === "suspended") {
    user.status = "active";
  } else {
    user.status = "suspended";
  }

  await user.save();

  return user;
};

// Toggle account status
export const toggleUserStatus = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.status === "suspended") {
    throw new ApiError(400, "A suspended account cannot be modified.");
  }

  user.status = user.status === "active" ? "inactive" : "active";

  await user.save();

  return user;
};

// Verify Email
export const verifyUserEmail = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.emailVerified) {
    throw new ApiError(400, "Email already verified");
  }

  user.emailVerified = true;

  await user.save();

  return user;
};

// verify Kyc
export const VerifyUserKyc = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.kycStatus === "verified") {
    throw new ApiError(400, "KYC is already verified");
  }

  user.kycStatus = "verified";

  await user.save();

  return user;
};

// Reset user password to default
export const resetUserPassword = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const temporaryPassword = generateTemporaryPassword();

  user.password = await hashPassword(temporaryPassword);

  user.forcePasswordChange = true;

  user.resetPasswordCode = null;
  user.resetPasswordExpires = null;

  await user.save();

  return {
    temporaryPassword,
  };
};

// Delete user and associated data.
// Transactions are intentionally preserved for auditing.
export const deleteUser = async (userId) => {
  const session = await mongoose.startSession();

  let profileImagePublicId = null;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    // Save the image ID before deleting the user
    profileImagePublicId = user.profileImagePublicId;

    session.startTransaction();

    await Account.deleteOne({
      owner: userId,
    }).session(session);

    await User.deleteOne({
      _id: userId,
    }).session(session);

    await session.commitTransaction();

    if (profileImagePublicId) {
      try {
        await deleteImage(profileImagePublicId);
      } catch (error) {
        console.error("Failed to delete profile image:", error.message);
      }
    }

    return true;
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }
};

// Credit or debit user
export const creditDebitUser = async (userId, transactionData) => {
  const { amount, direction, type, description } = transactionData;

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Transaction amount must be greater than zero.");
  }

  let method;

  switch (type) {
    case "bank_charge":
      method = "internal bank debit";
      break;

    case "withdrawal":
      method = "admin";
      break;

    case "deposit":
      method = "bank";
      break;

    default:
      method = "admin";
  }

  const session = await mongoose.startSession();

  try {
    const validCombinations = {
      credit: ["deposit"],

      debit: ["withdrawal", "bank_charge"],
    };

    if (!validCombinations[direction]?.includes(type)) {
      throw new ApiError(
        400,
        "Invalid transaction type for the selected action.",
      );
    }
    session.startTransaction();

    const account = await Account.findOne({
      owner: userId,
    }).session(session);

    if (!account) {
      throw new ApiError(404, "Account not found.");
    }

    if (account.status !== "active") {
      throw new ApiError(400, "Account is not active.");
    }

    if (direction === "debit" && account.balance < amount) {
      throw new ApiError(400, "Insufficient account balance.");
    }

    if (direction === "credit") {
      account.balance += amount;
    } else {
      account.balance -= amount;
    }

    await account.save({ session });

    const reference = generateTransactionReference();

    const [transaction] = await Transaction.create(
      [
        {
          owner: userId,
          ownerAccount: account._id,

          amount,

          type,
          direction,
          method,

          reference,

          status: "completed",

          description: description || "Internal Transaction",
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return {
      transactionId: transaction._id,
      reference: transaction.reference,
      amount: transaction.amount,
      type: transaction.type,
      direction: transaction.direction,
      method: transaction.method,
      status: transaction.status,
      description: transaction.description,
      createdAt: transaction.createdAt,
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
