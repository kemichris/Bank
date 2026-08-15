import { AdminLayout } from "../pages/layout/AdminLayout";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ManageUsers } from "../pages/admin/ManageUsers";
import { UserDetails } from "../pages/admin/UserDetails";
import { ManageCredits } from "../pages/admin/ManageCredits";
import { ManageDebits } from "../pages/admin/ManageDebits";
import { PaymentSetting } from "../pages/admin/PaymentSetting";
import { AddPaymentMethod } from "../pages/admin/AddPaymentMethod";
import { EditPaymentMethod } from "../pages/admin/EditPaymentMethod";
import { CardsService } from "../pages/admin/CardsService";

export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/manage-users/:userId",
        element: <UserDetails />,
      },
      {
        path: "/admin/cards",
        element: <CardsService />,
      },
      {
        path: "/admin/transactions/credits",
        element: <ManageCredits />,
      },
      {
        path: "/admin/transactions/debits",
        element: <ManageDebits />,
      },
      {
        path: "/admin/settings/payment",
        element: <PaymentSetting />,
      },
      {
        path: "/admin/settings/payment/add",
        element: <AddPaymentMethod /> ,
      },
      {
        path: "/admin/settings/payment/edit/:id",
        element: <EditPaymentMethod /> ,
      },
    ],
  },
];
