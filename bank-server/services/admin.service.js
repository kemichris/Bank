import User from "../models/user.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
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
