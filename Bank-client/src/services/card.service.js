import api from "../utils/axios";

// get cards 
export const getCards = async () => {
    const {data} = await api.get('/card')
    return data
}

export const getCard = async (cardId) => {
    const {data} = await api.get(`/card/${cardId}`)
    return data
}


export const getActiveCards = async () => {
    const response = await api.get('/card/overview');

    return response.data
}

export const cardRequest = async formData => {
    const {data} = await api.post('card/request', formData)
    return data
}