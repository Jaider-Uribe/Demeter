import axios from './axios';

export const getCategory_productsRequest = () => axios.get('/category_products')
export const getOne_Category_productsRequest = (ID_CATEGORIA_PRODUCTO) => axios.get(`/category_products/${ID_CATEGORIA_PRODUCTO}`);  
export const createCategory_productsRequest = (category) => axios.post('/category_products', category);
export const disableCategory_productsRequest = (ID_CATEGORIA_PRODUCTO) => axios.put(`/category_products/${ID_CATEGORIA_PRODUCTO}`);
