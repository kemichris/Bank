import api from '../utils/axios';

export const profileData = async () => {
    const { data } = await api.get('/user/profile');
    return data;
};

export const changePassword = async passwordData => {
    const { data } = await api.put(
        '/user/change-password',
        passwordData
    );

    return data;
};