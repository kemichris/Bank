import api from '../utils/axios';

export const taxRefundRequest = async formData => {
    const {data} = await api.post('/tax/submit-request', formData)
    return data
}