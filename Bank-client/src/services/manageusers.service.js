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
