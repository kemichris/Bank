import {
  FaHome,
  FaChartLine,
  FaCreditCard,
  FaUserAlt,
  FaUniversity,
  FaFileInvoice,
  FaEnvelope
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
      {
        name: 'Cards Services',
        icon: FaCreditCard,
        path: '/admin/cards'
      }
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

  {
    title: 'SERVICES',
    links: [
      {
        name: 'Loan Management',
        icon: FaUniversity,
        path: '/admin/loans'
      },
      {
        name: 'Tax Refund',
        icon: FaFileInvoice,
        path: '/admin/tax-refund'
      },
      // {
      //   name: 'Grants',
      //   icon: FaHandHoldingUsd,
      //   path: '/dashboard/grants'
      // }
    ]
  },
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

  {
    title: 'Email Sevices',
    links: [
      {
        name: 'Send Mail',
        icon: FaEnvelope,
        path: '/admin/email'
      }
    ]
  }
];