import api from '../utils/axios';

export const addPaymentMethod = async (formData) => {
    const {data} = await api.post('/payment-method/create', formData)
    return data
}

// Get payment methods 
export const getPaymentMethods = async () => {
    const {data} = await api.get('/payment-method')
    return data
}