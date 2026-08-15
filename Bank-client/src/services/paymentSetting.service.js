import api from '../utils/axios';

export const addPaymentMethod = async (formData) => {
    const {data} = await api.post('/payment-method/create', formData)
    return data
}