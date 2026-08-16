import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import { loanStatusUpdate } from "../../services/loan.service";

export function LoanDetailsModal({ isOpen, loan, onClose, reload }) {
      const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    approvedAmount: "",
    interestRate: "",
    rejectionReason: "",
  });

  useEffect(() => {
    if (loan) {
      setFormData({
        status: "",
        approvedAmount: loan.approvedAmount || "",
        interestRate: loan.interestRate || "",
        rejectionReason: loan.rejectionReason || "",
      });
    }
  }, [loan]);

  if (!isOpen || !loan) return null;

  const statusOptions = {
    pending: ["active", "rejected", "cancelled"],

    active: ["completed", "defaulted", "cancelled"],

    rejected: [],

    completed: [],

    defaulted: [],

    cancelled: [],
  };

  const availableStatuses = statusOptions[loan.status] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await loanStatusUpdate({
      loanId: loan._id,
      ...formData,
    });

    toast.success('Loan updated successfully.');

    await reload()

    onClose();

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        'Failed to update the loan.',
    );
  }finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface-2 p-6">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">Loan Details</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted hover:bg-surface-1"
          >
            <FaTimes />
          </button>
        </div>

        {/* Loan details */}

        <div className="space-y-4">
          <LoanDetail
            label="Requested Amount"
            value={`$${loan.requestedAmount}`}
          />

          <LoanDetail
            label="Approved Amount"
            value={loan.approvedAmount || "-"}
          />

          <LoanDetail label="Purpose" value={loan.purpose} />

          <LoanDetail label="Term" value={`${loan.term} ${loan.termUnit}`} />

          <LoanDetail
            label="Interest Rate"
            value={loan.interestRate ? `${loan.interestRate}%` : "-"}
          />

          <LoanDetail
            label="Total Repayment"
            value={loan.totalRepayment || "-"}
          />

          <LoanDetail label="Amount Repaid" value={loan.amountRepaid} />

          <LoanDetail
            label="Remaining Balance"
            value={loan.remainingBalance || "-"}
          />

          <LoanDetail label="Status" value={loan.status} />
        </div>

        {/* Update form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 border-t border-border pt-6"
        >
          <h3 className="text-lg font-semibold text-text">
            Update Loan Status
          </h3>

          {availableStatuses.length > 0 ? (
            <>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
              >
                <option value="">Select a new status</option>

                {availableStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              {formData.status === "active" && (
                <>
                  <input
                    type="number"
                    name="approvedAmount"
                    value={formData.approvedAmount}
                    onChange={handleChange}
                    placeholder="Approved amount"
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
                  />

                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    placeholder="Interest rate (%)"
                    className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
                  />
                </>
              )}
              ;
              {formData.status === "rejected" && (
                <textarea
                  rows="4"
                  name="rejectionReason"
                  value={formData.rejectionReason}
                  onChange={handleChange}
                  placeholder="Reason for rejection"
                  className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
                />
              )}
              <button
                type="submit"
                disabled={loading || !formData.status}
                className="w-full rounded-lg bg-primary px-6 py-3 text-white disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Loan"}
              </button>
            </>
          ) : (
            <div className="rounded-lg border border-border p-4 text-center text-text-muted">
              This loan can no longer be updated.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function LoanDetail({ label, value }) {
  return (
    <div className="flex flex-col gap-3 border-b border-border pb-3">
      <span className="text-sm text-text-muted">{label}</span>

      <span className="text-sm font-medium text-text">{value}</span>
    </div>
  );
}
