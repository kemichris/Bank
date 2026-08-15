import api from "../utils/axios";

export const addPaymentMethod = async (formData) => {
  const { data } = await api.post("/payment-method/create", formData);
  return data;
};

// Get payment methods
export const getPaymentMethods = async () => {
  const { data } = await api.get("/payment-method");
  return data;
};

// get by id
export const getPaymentMethod = async (id) => {
  const { data } = await api.get(`/payment-method/${id}`);

  return data;
};

// upate payment method
export const updatePaymentMethod = async (id, formData) => {
  const { data } = await api.patch(`/payment-method/${id}`, formData);

  return data;
};

// Create deposit
export const deposit = async (formData) => {
  const { data } = await api.post("/transaction/deposit", formData);
  return data;
};

// toggle status
export const togglePaymentStatus = async (methodId) => {
  const { data } = await api.patch(`/payment-method/${methodId}/toggle`);

  return data;
};

// Delete payment method
export const deletePaymentMethod = async (methodId) => {
  const { data } = await api.delete(`/payment-method/${methodId}`);
  return data;
};
