import { useState } from "react";
import { FaBan, FaLockOpen, FaTimes } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

import { ConfirmationModal } from "../common/ConfirmationModal";

import { handleBlock, handleUnblock, handleCancel } from "./cardActions";

export function CardDetailsModal({ isOpen, card, onClose, reload }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !card) return null;

  const isBlocked = card.status === "blocked";
  const isCanceled = card.status === "cancelled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface-2 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">Card Details</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted hover:bg-surface-1"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          <CardDetail label="Name" value={card.cardHolderName} />

          <CardDetail label="Brand" value={card.brand} />

          <CardDetail label="Card Number" value={card.cardNumber} />

          <CardDetail label="Expiry Month" value={card.expiryMonth} />

          <CardDetail label="Expiry Year" value={card.expiryYear} />

          <CardDetail label="CVV" value={card.cvv} />

          <CardDetail label="Status" value={card.status} />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            disabled={loading || isCanceled || isBlocked}
            onClick={() => {
              setModalMessage("Are you sure you want to block this card?");

              setModalAction(() => () =>
                handleBlock(card, setLoading, setShowModal, reload),
              );

              setShowModal(true);
            }}
            className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              <FaBan />
              Block
            </span>
          </button>

          <button
            type="button"
            disabled={loading || isCanceled || !isBlocked}
            onClick={() => {
              setModalMessage("Are you sure you want to unblock this card?");

              setModalAction(() => () =>
                handleUnblock(card, setLoading, setShowModal, reload),
              );

              setShowModal(true);
            }}
            className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              <FaLockOpen />
              Unblock
            </span>
          </button>

          <button
            type="button"
            disabled={loading || isCanceled}
            onClick={() => {
              setModalMessage(
                "Are you sure you want to cancel this card? This action cannot be undone.",
              );

              setModalAction(() => () =>
                handleCancel(card, setLoading, setShowModal, reload),
              );

              setShowModal(true);
            }}
            className="flex-1 rounded-xl bg-red-700 px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              <ImCancelCircle />
              Cancel
            </span>
          </button>
        </div>
      </div>

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

function CardDetail({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      <span className="text-sm text-text-muted">{label}</span>

      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}
