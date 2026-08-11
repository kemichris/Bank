import api from '../utils/axios';

export const loanApplication = async formData => {
    const {data} = await api.post('/loan/apply', formData)
    return data
}