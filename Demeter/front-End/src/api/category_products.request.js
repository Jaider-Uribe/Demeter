import axios from './axios';

export const getCategory_productsRequest = () => axios.get('/category_products')
export const getOne_Category_productsRequest = (Id_Category) => axios.get(`/category_products/${Id_Category}`);  
export const createCategory_productsRequest = (category) => axios.post('/category_products', category);
export const disableCategory_productsRequest = (Id_Category) => axios.put(`/category_products/disable/${Id_Category}`);
export const updateCategory_productsRequest = (Id_Category, categoryProducts) => axios.put(`/category_products/update/${Id_Category}`, categoryProducts)
export const deleteCategory_productsRequest = (Id_Category) => axios.delete(`/category_products/${Id_Category}`);
