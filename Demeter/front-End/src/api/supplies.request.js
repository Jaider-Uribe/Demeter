import axios from './axios';

export const getSuppliesRequest = () => axios.get('/supplies');
export const getSupplieRequest = (ID_INSUMO) => axios.get(`/supplies/${ID_INSUMO}`);  
export const createSuppliesRequest = (supplie) => axios.post('/supplies', supplie);
export const disableSuppliesRequest = (ID_INSUMO) => axios.put(`/supplies/${ID_INSUMO}`);