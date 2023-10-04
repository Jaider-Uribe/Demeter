import axios from './axios';

export const getCategory_suppliesRequest = () => axios.get('/category_supplies')
export const getOne_Category_suppliesRequest = (ID_CATEGORIA_INSUMO) => axios.get(`/category_supplies/${ID_CATEGORIA_INSUMO}`);  
export const createCategory_suppliesRequest = (category) => axios.post('/category_supplies', category);
export const disableCategory_suppliesRequest = (ID_CATEGORIA_INSUMO) => axios.put(`/category_supplies/disable/${ID_CATEGORIA_INSUMO}`);
export const updateCategory_suppliesRequest = (ID_CATEGORIA_INSUMO, categorySupplies) => axios.put(`/category_supplies/update/${ID_CATEGORIA_INSUMO}`, categorySupplies)
export const deleteCategory_suppliesRequest = (ID_CATEGORIA_INSUMO) => axios.delete(`/category_supplies/${ID_CATEGORIA_INSUMO}`);
