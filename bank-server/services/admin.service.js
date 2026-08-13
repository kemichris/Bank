import mongoose from "mongoose";
import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import Role from "../models/role.model.js";
import ApiError from "../utils/apiError.utils.js";

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

// Credit or debit user
export const creditDebitUser = async (userId, transactionData) => {
  const { amount, direction, type, description } = transactionData;

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Transaction amount must be greater than zero.");
  }

  let method;

  switch (type) {
    case "bank-charge":
      method = "internal-bank-debit";
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
