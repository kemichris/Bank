import api from "../utils/axios";

export const getActiveCards = async () => {
    const response = await api.get('/card/overview');

    return response.data
}