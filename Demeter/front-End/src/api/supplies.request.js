import axios from './axios';

export const getSuppliesRequest = () => axios.get('/supplies');
export const getSupplieRequest = (ID_INSUMO) => axios.get(`/supplies/${ID_INSUMO}`);  
export const createSuppliesRequest = (supplie) => axios.post('/supplies', supplie);
export const disableSuppliesRequest = (ID_INSUMO) => axios.put(`/supplies/disable/${ID_INSUMO}`);
export const updateSuppliesRequest = (ID_INSUMO, supplie) => axios.put(`/supplies/update/${ID_INSUMO}`, supplie)
export const deleteSuppliesRequest = (ID_INSUMO) => axios.delete(`/supplies/${ID_INSUMO}`);
