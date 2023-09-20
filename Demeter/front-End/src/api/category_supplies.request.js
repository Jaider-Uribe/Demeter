import axios from './axios';

export const getCategory_suppliesRequest = () => axios.get('/category_supplies')
export const getOne_Category_suppliesRequest = (ID_CATEGORIA_INSUMO) => axios.get(`/category_supplies/${ID_CATEGORIA_INSUMO}`);  
export const createCategory_suppliesRequest = (category) => axios.post('/category_supplies', category);
export const disableCategory_suppliesRequest = (ID_CATEGORIA_INSUMO) => axios.put(`/category_supplies/${ID_CATEGORIA_INSUMO}`);
