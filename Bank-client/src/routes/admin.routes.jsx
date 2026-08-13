import { AdminLayout } from "../pages/layout/AdminLayout";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { ManageUsers } from "../pages/admin/ManageUsers";
import { UserDetails } from "../pages/admin/UserDetails";

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
        path: "/admin/users/:id",
        element: <UserDetails />,
      },
    ],
  },
];
