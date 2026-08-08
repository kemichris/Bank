import api from '../utils/axios';

export const register = async formData => {
    const { data } = await api.post('/auth/register', formData);
    return data;
};

export const login = async formData => {
    const { data } = await api.post('/auth/login', formData);
    return data;
};

export const verifyEmail = async emailData => {
    const { data } = await api.post('/auth/verify-email', emailData);
    return data;
};

