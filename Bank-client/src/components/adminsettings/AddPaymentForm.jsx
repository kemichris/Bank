import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  addPaymentMethod,
  updatePaymentMethod,
} from "../../services/paymentSetting.service";

export function AddPaymentForm({ initialData = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: initialData?.type || "",
    name: initialData?.name || "",
    network: initialData?.network || "",
    paymentAddress: initialData?.paymentAddress || "",
    accountName: initialData?.accountName || "",
    bankName: initialData?.bankName || "",
    swiftCode: initialData?.swiftCode || "",
    icon: initialData?.icon || "",
    qrCode: null,
    instructions: initialData?.instructions || "",
    status: initialData?.status || "enabled",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files?.length ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      type: "",
      name: "",
      network: "",
      paymentAddress: "",
      accountName: "",
      bankName: "",
      swiftCode: "",
      icon: "",
      qrCode: null,
      instructions: "",
      status: "enabled",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      let res;

      if (initialData) {
        res = await updatePaymentMethod(initialData._id, payload);
      } else {
        res = await addPaymentMethod(payload);
      }

      toast.success(res.message);

      resetForm();

      setTimeout(() => {
        navigate("/admin/settings/payment");
      }, 1500);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          `Failed to ${initialData ? "update" : "create"} payment method.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const isCrypto = formData.type === "crypto";

  const isBank = formData.type === "bank";

  const isOthers = formData.type === "others";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
      >
        <option value="">Select payment type</option>

        <option value="crypto">Crypto</option>

        <option value="bank">Bank</option>

        <option value="others">Others</option>
      </select>

      {formData.type && (
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Payment method name"
          className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
        />
      )}

      {isCrypto && (
        <>
          <input
            type="text"
            name="network"
            value={formData.network}
            onChange={handleChange}
            placeholder="Network (ERC20, TRC20, BEP20...)"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="paymentAddress"
            value={formData.paymentAddress}
            onChange={handleChange}
            placeholder="Wallet address"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="file"
            name="qrCode"
            accept="image/*"
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />
        </>
      )}

      {isBank && (
        <>
          <input
            type="text"
            name="paymentAddress"
            value={formData.paymentAddress}
            onChange={handleChange}
            placeholder="Account number"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Account name"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Bank name"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="swiftCode"
            value={formData.swiftCode}
            onChange={handleChange}
            placeholder="SWIFT code"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />
        </>
      )}

      {isOthers && (
        <>
          <input
            type="text"
            name="paymentAddress"
            value={formData.paymentAddress}
            onChange={handleChange}
            placeholder="Payment address"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <span className="block text-sm text-text-muted">
            This can either be an email address, phone number, or a tag.
          </span>
        </>
      )}

      <input
        type="text"
        name="icon"
        value={formData.icon}
        onChange={handleChange}
        placeholder="Icon URL"
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
      />

      <textarea
        rows="4"
        name="instructions"
        value={formData.instructions}
        onChange={handleChange}
        placeholder="Instructions (optional)"
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
      >
        <option value="enabled">Enabled</option>

        <option value="disabled">Disabled</option>
      </select>

      <button
        type="submit"
        disabled={loading || !formData.type || !formData.name}
        className="rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? initialData
            ? "Updating..."
            : "Creating..."
          : initialData
            ? "Update Payment Method"
            : "Create Payment Method"}
      </button>
    </form>
  );
}
