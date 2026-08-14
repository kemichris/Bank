import { useState } from "react";
import toast from "react-hot-toast";

import { IoClose } from "react-icons/io5";

import { creditDebit } from "../../services/manageusers.service";

export function CreditDebitModal({ isOpen, onClose, userId, reload }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    direction: "",
    type: "",
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
      amount: "",
      direction: "",
      type: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await creditDebit(userId, {
        ...formData,
        amount: Number(formData.amount),
      });

      toast.success(res.message);

      await reload();

      resetForm();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="text-xl font-semibold text-text">Credit/Debit User</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-text-muted transition hover:text-text"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm text-text-muted">Amount</label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-text-muted">
              Credit or Debit
            </label>

            <select
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text outline-none"
              required
            >
              <option value="">Select action</option>

              <option value="credit">Credit</option>

              <option value="debit">Debit</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-text-muted">
              Transaction Type
            </label>

            <select
              className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text outline-none"
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>

              {formData.direction === "credit" && (
                <option value="deposit">Deposit</option>
              )}

              {formData.direction === "debit" && (
                <>
                  <option value="withdrawal">Withdrawal</option>

                  <option value="bank-charge">Bank Charge</option>
                  <option value="reversal">Reversal</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-text-muted">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-text outline-none"
            />
          </div>

          <p className="text-sm text-text-muted">
            Note: Debits should only be applied when necessary.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
