import api from '../utils/axios';

export const taxRefundRequest = async formData => {
    const {data} = await api.post('/tax/submit-request', formData)
    return data
}

// get all tax refunds application
export const getTaxRefunds = async () => {
  const { data } = await api.get("/tax");
  return data;
};

export const deleteTaxRefund = async (id) => {
  const { data } = await api.delete(`/tax/${id}`);
  return data;
};