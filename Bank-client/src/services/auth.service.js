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

export const resendVerificationCode = async email => {
    const { data } = await api.post('/auth/resend-verification-code', {
        email
    });

    return data;
};

export const getEmailVerificationStatus = async email => {
    const { data } = await api.get(
        '/auth/email-verification-status',
        {
            params: { email }
        }
    );

    return data;
};

