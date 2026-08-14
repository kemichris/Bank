import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

import { updateLimit } from "../../services/manageusers.service";

export function UpdateLimitModal({ isOpen, onClose, userId, reload }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        amount: Number(formData.amount),
      };

      const res = await updateLimit(userId, payload);

      await reload();

      toast.success(res.message);

      resetForm();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update limit.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h3 className="text-xl font-semibold text-text">
            Update Account Limit
          </h3>

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
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter new limit"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <button
            type="submit"
            disabled={loading || !Number(formData.amount)}
            className="rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Limit"}
          </button>
        </form>
      </div>
    </div>
  );
}
