import { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
// import toast from "react-hot-toast";

import { Table } from "../common/Table";

import { ConfirmationModal } from "../common/ConfirmationModal";


import formatMoney from "../../utils/formatMoney";
import { handleDelete } from "../adminTransactions/transactionActions";

export function LoanManagementTable({ loans, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const loanColums = [
    {
      key: "name",
      label: "Name",
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
      key: "amount requested",
      label: "Amount Requested",
      render: (row) => formatMoney(row.requestedAmount),
    },

    {
      key: "duration",
      label: "Duration",
      render: (row) => `${row.term} months`,
    },

    {
      key: "status",
      label: "Status",
      render: (row) => row.status,
    },

    {
      key: "action",
      label: "Action",

      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
            //   setSelectedCard(row);
            //   setShowDetailsModal(true);
            }}
            className="rounded-lg bg-primary-1 p-2 text-white"
          >
            <FaEye />
          </button>
          <button
            type="button"
            onClick={() => {
              setModalMessage(
                "Are you sure you want to delete this card? This action cannot be undone.",
              );
              setModalAction(
                () => () => handleDelete(row, setLoading, setShowModal, reload),
              );
              setShowModal(true);
            }}
            className="rounded-lg bg-red-500 p-2 text-white"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={loanColums} data={loans} />

      <ConfirmationModal
        isOpen={showModal}
        message={modalMessage}
        onConfirm={modalAction}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
}
