import api from '../utils/axios';

export const getUsers = async ()=> {
    const {data} = await api.get('/admin/users')
    return data
}