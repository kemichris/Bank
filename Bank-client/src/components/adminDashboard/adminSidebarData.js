import {
  FaHome,
  FaChartLine,
  // FaCreditCard,
  FaUserAlt,
  // FaUniversity,
  // FaFileInvoice,
  // FaHeadset,
  // FaEnvelope
} from 'react-icons/fa';

import { LuSettings2 } from "react-icons/lu";

export const adminSidebarData = [
  {
    title: 'MAIN',
    links: [
      {
        name: 'Dashboard',
        icon: FaHome,
        path: '/admin'
      },
      {
        name: 'Manage Users',
        icon: FaUserAlt,
        path: '/admin/manage-users'
      },
      // {
      //   name: 'Cards Services',
      //   icon: FaCreditCard,
      //   path: '/dashboard/card'
      // }
    ]
  },
  {
    title: 'TRANSACTIONS',
    links: [
     {
        name: 'Manage Credits',
        icon: FaChartLine,
        path: '/admin/transactions/credits'
      },
      {
        name: 'Manage Debits',
        icon: FaChartLine,
        path: '/admin/transactions/debits'
      },
    ]

  },

  // {
  //   title: 'SERVICES',
  //   links: [
  //     {
  //       name: 'Loans',
  //       icon: FaUniversity,
  //       path: '/dashboard/loan'
  //     },
  //     {
  //       name: 'Tax Refund',
  //       icon: FaFileInvoice,
  //       path: '/dashboard/tax-refund'
  //     },
  //     // {
  //     //   name: 'Grants',
  //     //   icon: FaHandHoldingUsd,
  //     //   path: '/dashboard/grants'
  //     // }
  //   ]
  // },
  {
    title: 'SETTING',
    links: [
      {
        name: 'Payment Settings',
        icon: LuSettings2,
        path: '/admin/settings/payment'
      }
    ]
  },

  // {
  //   title: 'Email',
  //   links: [
  //     {
  //       name: 'Send Mail',
  //       icon: FaEnvelope,
  //       path: '/dashboard/settings'
  //     }
  //   ]
  // }
];