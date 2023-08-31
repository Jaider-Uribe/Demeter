import axios from './axios';

export const getCategory_productsRequest = () => axios.get('/category_products')
export const getOne_Category_productsRequest = (ID_CATEGORIA_PRODUCTO) => axios.get(`/category_products/${ID_CATEGORIA_PRODUCTO}`);  
export const createCategory_productsRequest = (category) => axios.post('/category_products', category);
export const updateCategory_productsRequest = (ID_CATEGORIA_PRODUCTO, categoryProducts) => axios.put(`/category_products/${ID_CATEGORIA_PRODUCTO}`, categoryProducts)
export const deleteCategory_productsRequest = (ID_CATEGORIA_PRODUCTO) => axios.delete(`/category_products/${ID_CATEGORIA_PRODUCTO}`);
