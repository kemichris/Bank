import api from "../utils/axios";

export const loanApplication = async (formData) => {
  const { data } = await api.post("/loan/apply", formData);
  return data;
};

export const getLoans = async () => {
  const { data } = await api.get("/loan");
  return data;
};

export const getLoan = async ({ loanId }) => {
  const { data } = await api.get(`/loan/${loanId}`);

  return data;
};

// update loan status
// update loan status
export const loanStatusUpdate = async ({ loanId, ...payload }) => {
  const { data } = await api.patch(`/loan/${loanId}/status`, payload);

  return data;
};
