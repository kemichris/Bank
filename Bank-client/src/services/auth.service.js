import api from '../utils/axios';

export const register = async formData => {
    const { data } = await api.post('/auth/register', formData);
    return data;
};