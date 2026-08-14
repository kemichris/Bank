import { useState } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash } from "react-icons/fa";

import { Table } from "../common/Table";
import { TransactionModal } from "../transaction/TransactionModal";
import { formatMoney } from "../../utils/formatMoney";
import { ReceiptModal } from "./ReceiptModal";
import { ConfirmationModal } from "../common/ConfirmationModal";

import {
  handleReject,
  handleDelete,
  handleConfirm,
} from "./transactionActions";

export function AdminTransactionTable({ transactions, reload }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const transactionColumns = [
    {
      key: "name",
      label: "Name",
      render: (row) => {
        if (row.type === "deposit") {
          return "Deposit";
        }

        if (row.type === "withdrawal") {
          return "Withdrawal";
        }

        if (row.type === "bank_charge") {
          return "Bank Charge";
        }

        if (row.type === "reversal") {
          return "Reversal";
        }

        if (row.counterParty) {
          return `${row.counterParty.firstName} ${row.counterParty.lastName}`;
        }

        if (row.internationalDetails?.beneficiaryAccountName) {
          return row.internationalDetails.beneficiaryAccountName;
        }

        return "Transfer";
      },
    },

    {
      key: "date",
      label: "Date",
      render: (row) => new Date(row.createdAt).toLocaleString(),
    },

    {
      key: "amount",
      label: "Amount",
      render: (row) => {
        const isCredit = row.direction === "credit";

        return (
          <span
            className={
              isCredit
                ? "font-semibold text-green-500"
                : "font-semibold text-red-500"
            }
          >
            {isCredit ? "+" : "-"}${formatMoney(row.amount)}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row) => row.status,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => {
        const hasImage = Boolean(row.proofImage || row.image || row.receipt);

        return (
          <div className="flex items-center gap-2">
            {hasImage && (
              <button
                type="button"
                title="View image"
                onClick={(e) => {
                  e.stopPropagation();

                  setSelectedReceipt(row.receipt);
                }}
                className="rounded-lg bg-primary p-2 text-white"
              >
                <FaEye />
              </button>
            )}

            {row.status === "pending" && (
              <>
                <button
                  type="button"
                  title="Confirm"
                  onClick={(e) => {
                    e.stopPropagation();

                    // Confirm transaction function
                    setModalMessage(
                      "Once approved, this action cannot be undone.",
                    );
                    setModalAction(
                      () => () =>
                        handleConfirm(row, setLoading, setShowModal, reload),
                    );
                    setShowModal(true);
                  }}
                  className="rounded-lg bg-green-600 p-2 text-white"
                >
                  <FaCheck />
                </button>

                <button
                  type="button"
                  title="Reject"
                  onClick={(e) => {
                    e.stopPropagation();

                    // Reject transaction function
                    setModalMessage(
                      "Are you sure you want to reject this transaction? this action cannot be undone.",
                    );
                    setModalAction(
                      () => () =>
                        handleReject(row, setLoading, setShowModal, reload),
                    );
                    setShowModal(true);
                  }}
                  className="rounded-lg bg-red-500 p-2 text-white"
                >
                  <FaTimes />
                </button>
              </>
            )}

            <button
              type="button"
              title="Delete"
              onClick={(e) => {
                e.stopPropagation();

                // Delete transaction function
                setModalMessage(
                  "Are you sure you want to delete this transaction? this action cannot be undone.",
                );
                setModalAction(
                  () => () =>
                    handleDelete(row, setLoading, setShowModal, reload),
                );
                setShowModal(true);
              }}
              className="rounded-lg bg-red-700 p-2 text-white"
            >
              <FaTrash />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={transactionColumns}
        data={transactions}
        onRowClick={setSelectedTransaction}
      />
      <TransactionModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
      <ReceiptModal
        isOpen={Boolean(selectedReceipt)}
        image={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

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
