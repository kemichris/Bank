import { AdminLayout } from "../pages/layout/AdminLayout";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ManageUsers } from "../pages/admin/ManageUsers";
import { UserDetails } from "../pages/admin/UserDetails";
import { ManageCredits } from "../pages/admin/ManageCredits";
import { ManageDebits } from "../pages/admin/ManageDebits";

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
        path: "/admin/credits/",
        element: <ManageCredits />,
      },
      {
        path: "/admin/debits/",
        element: <ManageDebits />,
      },
    ],
  },
];
