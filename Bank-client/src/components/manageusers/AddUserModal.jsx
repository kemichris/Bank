import { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import { createUser } from "../../services/manageusers.service";

export function AddUserModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    country: "",
    accountType: "savings",
    password: "",
    transactionPin: "",
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
      firstName: "",
      lastName: "",
      middleName: "",
      username: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      country: "",
      accountType: "savings",
      password: "",
      transactionPin: "",
    });
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.username.trim() &&
    formData.email.trim() &&
    formData.phoneNumber.trim() &&
    formData.dateOfBirth &&
    formData.country.trim() &&
    formData.password.trim() &&
    formData.transactionPin.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await createUser(formData);

      toast.success(res.message);

      resetForm();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-surface-2 shadow-xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h3 className="text-xl font-semibold text-text">Add User</h3>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-text-muted"
          >
            <IoClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] space-y-5 overflow-y-auto p-6"
        >
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle name"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-text"
          >
            <option value="savings">Savings</option>

            <option value="current">Current</option>

            <option value="business">Business</option>
          </select>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <input
            type="password"
            name="transactionPin"
            value={formData.transactionPin}
            onChange={handleChange}
            placeholder="Transaction PIN"
            className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-text"
          />

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="rounded-lg bg-primary px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating User..." : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}
