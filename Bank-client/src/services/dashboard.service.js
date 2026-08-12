import api from '../utils/axios';

// users dashboard 
export const getDashboardData = async () => {
    const { data } = await api.get('/user/dashboard');
    return data;
};


// Admin dashboad 
export const getAdminDashboardData = async () => {
    const {data} = await api.get('/admin/dashboard');
    return data
}



