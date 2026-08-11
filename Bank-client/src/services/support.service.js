import api from "../utils/axios";

 export const createTicket = async ticketData => {
    const {data} = await api.post('/support/ticket', ticketData) 
    
        return data;

}