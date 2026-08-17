import { useState } from "react";
import toast from "react-hot-toast";

import { updateTransferCharge } from "../../services/settings.service";

export function TransferChargeForm() {
  const [charge, setCharge] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await updateTransferCharge({
        internationalTransferCharge: Number(charge),
      });

      toast.success("Transfer charge updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update transfer charge.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface-2 p-6"
    >
      <h2 className="mb-6 text-xl font-semibold text-text">
        International Transfer Charge
      </h2>

      <div className="space-y-2">
        <label className="text-sm text-text-muted">Transfer Charge (%)</label>

        <input
          type="number"
          step="0.01"
          min="0"
          value={charge}
          onChange={(e) => setCharge(e.target.value)}
          placeholder="2.50"
          className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-text outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !charge}
        className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Charge"}
      </button>
    </form>
  );
}
