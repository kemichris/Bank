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

export const changePin = async pinData => {
    const { data } = await api.put(
        '/user/change-pin',
        pinData
    );

    return data;
};

// upate profile photo
export const profileImgUpdate = async formData => {
    const { data } = await api.put(
        '/user/profile-image',
        formData
    );

    return data;
};