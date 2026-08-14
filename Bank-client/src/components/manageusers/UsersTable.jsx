import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Table } from "../common/Table";
import { AddUserModal } from "./AddUserModal";
import formatMoney from "../../utils/formatMoney";

const userColumns = [
  {
    key: "user",
    label: "User",
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-medium text-text">
          {row.firstName} {row.lastName}
        </span>

        <span className="text-sm text-text-muted">{row.email}</span>
      </div>
    ),
  },

  {
    key: "account",
    label: "Account",
    render: (row) => row.account.accountNumber,
  },
  {
    key: "balance",
    label: "Balance",
    render: (row) => `$${formatMoney(row.account.balance)}`,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => row.status,
  },
  {
    key: "createdAt",
    label: "Joined",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    key: "lastLogin",
    label: "Last Login",
    render: (row) =>
      row.lastLogin ? new Date(row.lastLogin).toLocaleString() : "Never",
  },

  {
    key: "action",
    label: "Action",
    render: (row) => (
      <Link
        to={`/admin/manage-users/${row._id}`}
        className="
                rounded-lg
                bg-primary
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:opacity-90
            "
      >
        Manage
      </Link>
    ),
  },
];

export function UsersTable({ users }) {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowAddUserModal(true)}
        className="mb-3 text-text flex items-center gap-2 p-2 bg-primary-1 rounded-lg text-sm hover:scale-[.9] transition-transform"
      >
        <FaUserPlus /> New User
      </button>
      <Table columns={userColumns} data={users} />
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() =>
          setShowAddUserModal(false)
        }
        
      />
    </div>
  );
}
