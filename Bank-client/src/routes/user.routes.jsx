import { DashboardLayout } from '../pages/layout/DashboardLayout';
import { Dashboard } from '../pages/user/Dashboard';
import { Transactions } from '../pages/user/Transactions';
import { Card } from '../pages/user/Card';
import { CardApplication } from '../pages/user/CardApplication';
import { LocalTransfer } from '../pages/user/LocalTransfer';
import { International } from '../pages/user/International';
import { Deposit } from '../pages/user/Deposit';
import { DepositPayment } from '../pages/user/DepositPayment';

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
                {
                    path: '/dashboard/local-transfer',
                    element: <LocalTransfer />
                },
                {
                    path: '/dashboard/international',
                    element: <International />
                },
                {
                    path: '/dashboard/deposit',
                    element: <Deposit />
                },
                {
                    path: '/dashboard/deposit/payment',
                    element: <DepositPayment />
                },
            ]
    }
];
