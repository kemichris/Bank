import { UserStatCard } from "./UserStatCard";
import formatMoney from "../../utils/formatMoney";

export const UserStats = ({ user }) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 border border-border rounded-2xl p-4">
      <UserStatCard
        title="Account Balance"
        value={formatMoney(user.account.balance)}
      />

      <UserStatCard
        title="Account Limit"
        value={formatMoney(user.account.limit)}
      />

      <UserStatCard title="Deposits" value={formatMoney(user.totalDeposits)} />

      <UserStatCard
        title="Withdrawals"
        value={formatMoney(user.totalWithdrawals)}
      />

      <UserStatCard
        title="Account Status"
        badge={
          user.status === "active"
            ? "Active"
            : user.status === "inactive"
              ? "Inactive"
              : "Suspended"
        }
      />

      <UserStatCard
        title="KYC"
        badge={
          user.kycStatus === "verified"
            ? "Verified"
            : user.kycStatus === "unverified"
              ? "Unverified"
              : user.kycStatus === "pending"
                ? "Pending"
                : 'Rejected'
        }
      />
    </div>
  );
};
