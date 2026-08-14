import api from "../utils/axios";

// Get all users
export const getUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

// Get one user
export const getUser = async (userId) => {
  const { data } = await api.get(`/admin/users/${userId}`);

  return data;
};

// update user
export const updateUser = async (userId, userData) => {
  const { data } = await api.patch(`/admin/users/${userId}`, userData);

  return data;
};

// impersonate user
export const loginAsUser = async (userId) => {
  const { data } = await api.post(`/admin/users/${userId}/login`);

  return data;
};

// Toggle suspention
export const toggleSuspension = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/suspension`);

  return data;
};

// Toggle User Status
export const toggleStatus = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/status`);

  return data;
};

// Verify user email
export const verifyUserEmail = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/verify-email`);
  return data;
};

// Verfiy user kyc
export const verifyUserKyc = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/verify-kyc`);
  return data;
};

// Reset user password to default
export const resetUserPassword = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/reset-password`);
  return data;
};

// Delet user
export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/admin/users/${userId}`);

  return data;
};

// Credit - debit user
export const creditDebit = async (userId, trasactionData) => {
  const { data } = await api.post(
    `/admin/users/${userId}/credit-debit`,
    trasactionData,
  );

  return data;
};

// Admin local transfer
export const adminTransfer = async (userId, transferData) => {
  const { data } = await api.post(
    `/admin/users/${userId}/transfer`,
    transferData,
  );
  return data;
};

// Admin international transfer
export const adminIntTransfer = async (userId, transferData) => {
  const { data } = await api.post(
    `/admin/users/${userId}/international-transfer`,
    transferData,
  );
  return data;
};
