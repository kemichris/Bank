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

// Approve card
export const approveCard = async (cardId) => {
    const {data} = await api.patch(`/card/approve/${cardId}`)
    return data
}

// Reject card
export const rejectCard = async (cardId) => {
    const {data} = await api.patch(`/card/reject/${cardId}`)
    return data
}

// block card
export const blockCard = async (cardId) => {
    const {data} = await api.patch(`/card/block/${cardId}`)
    return data
}

// unblock card
export const unblockCard = async (cardId) => {
    const {data} = await api.patch(`/card/unblock/${cardId}`)
    return data
}

// cancel card
export const cancelCard = async (cardId) => {
    const {data} = await api.patch(`/card/cancel/${cardId}`)
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

// delete card 
export const deleteCard = async (cardId) => {
    const {data} = await api.delete(`/card/${cardId}`)
    return data
}