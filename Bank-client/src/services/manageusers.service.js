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

// Toggle suspention 
export const toggleSuspension = async(userId) => { 
    const {data} = await api.patch(`/admin/users/${userId}/suspension`) 

    return data
}

// Toggle User Status 
export const toggleStatus = async(userId) => { 
    const {data} = await api.patch(`/admin/users/${userId}/status`) 

    return data
}

// Credit - debit user 
export const creditDebit = async(userId,trasactionData) => {
    const {data} = await api.post(`/admin/users/${userId}/credit-debit`, trasactionData)

    return data
}