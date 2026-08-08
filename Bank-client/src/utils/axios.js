import axios from 'axios';
import config from './config';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to requests
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Handle authentication errors
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response?.status === 401 &&
            !error.config?.url?.includes('/auth/login')) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            toast.error('Your session has expired. Please log in again.');

            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }

        return Promise.reject(error);
    }
);

export default api;