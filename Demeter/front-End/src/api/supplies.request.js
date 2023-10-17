import axios from './axios';

export const getSuppliesRequest = () => axios.get('/supplies');
export const getSupplieRequest = (Id_Supplies) => axios.get(`/supplies/${Id_Supplies}`);  
export const createSuppliesRequest = (supplie) => axios.post('/supplies', supplie);
export const disableSuppliesRequest = (Id_Supplies) => axios.put(`/supplies/disable/${Id_Supplies}`);
export const updateSuppliesRequest = (Id_Supplies, supplie) => axios.put(`/supplies/update/${Id_Supplies}`, supplie)
export const deleteSuppliesRequest = (Id_Supplies) => axios.delete(`/supplies/${Id_Supplies}`);
