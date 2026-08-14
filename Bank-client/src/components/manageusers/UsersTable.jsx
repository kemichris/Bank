import { Link } from "react-router-dom";
// import { useState } from "react";
import { Table } from "../common/Table";
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

  return (
    <div>
      <Table
        columns={userColumns}
        data={users}
      />
    </div>
  );
}
