import api from '../utils/axios';

export const getTransferRecipient = async accountNumber => {
    const { data } = await api.get(
        `/transaction/recipient?accountNumber=${accountNumber}`
    );

    return data;
};