import { AdminLayout } from "../pages/layout/AdminLayout";

import { AdminDashboard } from "../pages/admin/AdminDashboard";

export const adminRoutes = [
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
    ]
  }
];
