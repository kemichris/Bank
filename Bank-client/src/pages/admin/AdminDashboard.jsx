import { useState, useEffect } from "react";

import {
  FaUsers,
  FaMoneyBill,
  FaArrowDown,
  FaArrowUp,
  FaUsersSlash,
} from "react-icons/fa";

import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

import formatMoney from "../../utils/formatMoney";

import { StatsSection } from "../../components/dashboard/StatsSection";
import { PageLoader } from "../../components/common/PageLoader";

import { getAdminDashboardData } from "../../services/dashboard.service";

export function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getAdminDashboardData();

        setDashboardData(res.data);
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard()
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
      icon: <FaUsers />,
      timeline: "All Time",
      amount: 50,
      stat: "Total Users",
      bg: "bg-primary-2",
    },
    {
      icon: <FaMoneyBill />,
      timeline: "Total Holdings",
      amount: formatMoney(544484),
      stat: "Assets",
      bg: "bg-blue-500",
    },
    {
      icon: <FaArrowDown />,
      timeline: "All Credits",
      amount: formatMoney(40000),
      stat: "Total Deposits",
      bg: "bg-primary-3",
    },
    {
      icon: <FaArrowUp />,
      timeline: "All Debit",
      amount: formatMoney(40000),
      stat: "Total Expenses",
      bg: "bg-primary-4",
    },
    {
      icon: <FaUsers />,
      timeline: "Active Users",
      amount: 13,
      stat: "Users",
      bg: "bg-primary-5",
    },
    {
      icon: <FaUsersSlash />,
      timeline: "blocked Users",
      amount: 3,
      stat: "Users",
      bg: "bg-red-500",
    },
    {
      icon: <FaMoneyBillTrendUp />,
      timeline: "Pending",
      amount: 5,
      stat: "Withdrawals",
      bg: "bg-orange-500",
    },
    {
      icon: <GiPayMoney />,
      timeline: "Pending",
      amount: 7,
      stat: "Deposits",
      bg: "bg-primary-3",
    },
  ];

  console.log(dashboardData);

  return (
    <>
      <title>Columbia Merchant | Admin</title>

      <StatsSection statDatas={statDatas} />
    </>
  );
}
