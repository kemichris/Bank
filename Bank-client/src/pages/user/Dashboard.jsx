import { useEffect, useState } from "react";

import {
  FaChartLine,
  FaCreditCard,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import formatMoney from "../../utils/formatMoney";

import { StatsSection } from "../../components/dashboard/StatsSection";
import { AccountSection } from "../../components/dashboard/AccountSection";
import { RecentTransaction } from "../../components/dashboard/RecentTransaction";
import { PageLoader } from "../../components/common/PageLoader";

import { getDashboardData } from "../../services/dashboard.service";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardData();

        setDashboardData(res.data);
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!dashboardData) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <p className="text-text-muted">Unable to load dashboard data.</p>
      </div>
    );
  }

  const statDatas = [
    {
      icon: <FaCreditCard />,
      timeline: "Available",
      amount: formatMoney(dashboardData.account.limit),
      stat: "Account Limit",
      bg: "bg-primary-2",
    },
    {
      icon: <FaArrowDown />,
      timeline: "This Month",
      amount: formatMoney(dashboardData.statistics.monthlyCredit),
      stat: "Monthly Deposit",
      bg: "bg-primary-3",
    },
    {
      icon: <FaArrowUp />,
      timeline: "This Month",
      amount: formatMoney(dashboardData.statistics.monthlyDebit),
      stat: "Monthly Expenses",
      bg: "bg-primary-4",
    },
    {
      icon: <FaChartLine />,
      timeline: "All Time",
      amount: formatMoney(dashboardData.statistics.totalVolume),
      stat: "Total Volume",
      bg: "bg-primary-5",
    },
  ];

  console.log(dashboardData);

  return (
    <>
      <title>Columbia Merchant | Dashboard</title>

      <AccountSection
        account={dashboardData.account}
        user={dashboardData.user}
      />

      <StatsSection
        // statistics={dashboardData.statistics}
        // account={dashboardData.account}
        statDatas={statDatas}
      />

      <RecentTransaction transactions={dashboardData.recentTransactions} />
    </>
  );
}
