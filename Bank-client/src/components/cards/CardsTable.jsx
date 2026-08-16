import { useState } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash } from "react-icons/fa";


import { Table } from "../common/Table";
import { CardDetailsModal } from "./CardDetailsModal";
import { ConfirmationModal } from "../common/ConfirmationModal";

import { handleApprove, handleReject, handleDelete } from "./cardActions";

export function CardsTable({ cards, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const cardColumns = [
    {
      key: "name",
      label: "Name",
      render: (row) => row.cardHolderName,
    },

    {
      key: "brand",
      label: "Brand",
      render: (row) => row.brand,
    },

    {
      key: "last4",
      label: "Last 4",
      render: (row) =>
        `${row.last4 === null || row.last4 === undefined ? "****" : row.last4}`,
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
              setSelectedCard(row);
              setShowDetailsModal(true);
            }}
            className="rounded-lg bg-primary-1 p-2 text-white"
          >
            <FaEye />
          </button>

          {row.status === "pending" && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  // Confirm transaction function
                  setModalMessage(
                    "Once approved, this action cannot be undone.",
                  );
                  setModalAction(
                    () => () =>
                      handleApprove(row, setLoading, setShowModal, reload),
                  );
                  setShowModal(true);
                }}
                className="rounded-lg bg-green-600 p-2 text-white"
              >
                <FaCheck />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  // Confirm transaction function
                  setModalMessage(
                    "Once rejected, this action cannot be undone.",
                  );
                  setModalAction(
                    () => () =>
                      handleReject(row, setLoading, setShowModal, reload),
                  );
                  setShowModal(true);
                }}
                className="rounded-lg bg-yellow-500 p-2 text-white"
              >
                <FaTimes />
              </button>
            </>
          )}

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
      <Table columns={cardColumns} data={cards} />

      <CardDetailsModal
        isOpen={showDetailsModal}
        card={selectedCard}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedCard(null);
        }}
        reload={reload}
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
