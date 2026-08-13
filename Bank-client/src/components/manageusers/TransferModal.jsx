import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

import { adminTransfer } from "../../services/manageusers.service";

export function TransferModal({ isOpen, onClose, userId, reload }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    recipientAccountNumber: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      recipientAccountNumber: "",
      amount: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      const res = await adminTransfer(userId, payload);

      await reload();

      toast.success(res.message);

      resetForm();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h3 className="text-xl font-semibold text-text">Transfer Funds</h3>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-text-muted"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <input
            type="text"
            name="recipientAccountNumber"
            value={formData.recipientAccountNumber}
            onChange={handleChange}
            placeholder="Recipient account number"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <button
            type="submit"
            disabled={
              loading ||
              !formData.recipientAccountNumber.trim() ||
              !formData.amount
            }
            className="rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>
      </div>
    </div>
  );
}
