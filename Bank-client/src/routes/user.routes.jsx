import { DashboardLayout } from '../pages/layout/DashboardLayout';
import { Dashboard } from '../pages/user/Dashboard';
import { Transactions } from '../pages/user/Transactions';
import { Card } from '../pages/user/Card';
import { CardApplication } from '../pages/user/CardApplication';

export const userRoutes = [
    {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />
                },
                {
                    path: '/dashboard/transactions',
                    element: <Transactions />
                },
                {
                    path: '/dashboard/card',
                    element: <Card />
                },
                {
                    path: '/dashboard/card/apply',
                    element: <CardApplication />
                },
            ]
    }
];
