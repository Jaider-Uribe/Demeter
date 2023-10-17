import axios from './axios';

export const getCategory_suppliesRequest = () => axios.get('/category_supplies')
export const getOne_Category_suppliesRequest = (Id_Category) => axios.get(`/category_supplies/${Id_Category}`);  
export const createCategory_suppliesRequest = (category) => axios.post('/category_supplies', category);
export const disableCategory_suppliesRequest = (Id_Category) => axios.put(`/category_supplies/disable/${Id_Category}`);
export const updateCategory_suppliesRequest = (Id_Category, categorySupplies) => axios.put(`/category_supplies/update/${Id_Category}`, categorySupplies)
export const deleteCategory_suppliesRequest = (Id_Category) => axios.delete(`/category_supplies/${Id_Category}`);
