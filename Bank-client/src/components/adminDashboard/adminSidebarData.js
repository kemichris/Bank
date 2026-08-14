import {
  FaHome,
  FaChartLine,
  FaCreditCard,
  FaPaperPlane,
  FaUserAlt,
  FaGlobe,
  FaPlus,
  // FaExchangeAlt,
  FaUniversity,
  FaFileInvoice,
  // FaHandHoldingUsd,
  FaCog,
  FaHeadset
} from 'react-icons/fa';

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
        path: '/dashboard/card'
      }
    ]
  },
  {
    title: 'TRANSACTIONS',
    links: [
     {
        name: 'Manage Credits',
        icon: FaChartLine,
        path: '/admin/credits'
      },
      {
        name: 'Manage Debits',
        icon: FaChartLine,
        path: '/admin/debits'
      },
    ]

  },

  {
    title: 'TRANSFERS',
    links: [
      {
        name: 'Local Transfer',
        icon: FaPaperPlane,
        path: '/dashboard/local-transfer'
      },
      {
        name: 'International',
        icon: FaGlobe,
        path: '/dashboard/international'
      },
      {
        name: 'Deposit',
        icon: FaPlus,
        path: '/dashboard/deposit'
      }
      // {
      //   name: 'Currency Swap',
      //   icon: FaExchangeAlt,
      //   path: '/dashboard/swap'
      // }
    ]
  },

  {
    title: 'SERVICES',
    links: [
      {
        name: 'Loans',
        icon: FaUniversity,
        path: '/dashboard/loan'
      },
      {
        name: 'Tax Refund',
        icon: FaFileInvoice,
        path: '/dashboard/tax-refund'
      },
      // {
      //   name: 'Grants',
      //   icon: FaHandHoldingUsd,
      //   path: '/dashboard/grants'
      // }
    ]
  },

  {
    title: 'ACCOUNT',
    links: [
      {
        name: 'Settings',
        icon: FaCog,
        path: '/dashboard/settings'
      },
      {
        name: 'Support',
        icon: FaHeadset,
        path: '/dashboard/support'
      }
    ]
  }
];