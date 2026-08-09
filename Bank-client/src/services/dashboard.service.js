import api from '../utils/axios';

export const getDashboardData = async () => {
    const { data } = await api.get('/user/dashboard');
    return data;
};

export const getTransactionHistory = async () => {
    const response = await api.get('/transactions/history');

    return response.data;
};