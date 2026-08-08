import { useEffect, useState } from 'react';

import { StatsSection } from '../../components/dashboard/StatsSection';
import { AccountSection } from '../../components/dashboard/AccountSection';
import { RecentTransaction } from '../../components/dashboard/RecentTransaction';

import { getDashboardData } from '../../services/dashboard.service';

export function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const res = await getDashboardData();

                setDashboardData(res.data);

            } catch (error) {
                console.error(
                    error.response?.data || error
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    if (!dashboardData) {
        return <div>Unable to load dashboard.</div>;
    }

    console.log(dashboardData)

    return (
        <div className="h-full bg-surface-1">
            <AccountSection
                account={dashboardData.account}
                user={dashboardData.user}
            />

            <StatsSection
                statistics={dashboardData.statistics}
            />

            <RecentTransaction
                transactions={dashboardData.recentTransactions}
            />
        </div>
    );
}