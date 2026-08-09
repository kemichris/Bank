import { DashboardLayout } from '../pages/layout/DashboardLayout';
import { Dashboard } from '../pages/user/Dashboard';
import { Transactions } from '../pages/user/Transactions';
import { Card } from '../pages/user/Card';

export const userRoutes = [
    {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                {
                    path: '/dashboard/transactions',
                    element: <Transactions />,
                },
                {
                    path: '/dashboard/card',
                    element: <Card />,
                },
            ]
    }
];
