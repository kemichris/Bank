import { DashboardLayout } from '../pages/layout/DashboardLayout';
import { Dashboard } from '../pages/user/Dashboard';

export const userRoutes = [
    {
            element: <DashboardLayout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                // {
                //     path: '/dashboard/transactions',
                //     element: <Dashboard />,
                // },
            ]
    }
];
