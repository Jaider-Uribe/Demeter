import { createContext, useContext, useState } from "react";
import { getCategory_productsRequest, getOne_Category_productsRequest, createCategory_productsRequest, updateCategory_productsRequest, deleteCategory_productsRequest } from "../api/category_products.request";

const CategoryProductsContext = createContext();

export const useCategoryProducts = () => {
    const context = useContext(CategoryProductsContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de categoria de productos.");

    return context;
}

export function CategoryProducts({ children }) {
    const [Category_products, setCategory_products] = useState([]);

    const getCategory_products = async () => {
        try {
            const res = await getCategory_productsRequest();
            setCategory_products(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getOneCategory_products = async (id) => {
        try {
            const res = await getOne_Category_productsRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createCategory_products = async (category) => {
        const res = await createCategory_productsRequest(category)
        console.log(res);
    }

    const updateCategory_products = async (id, category) => {
        try {
            await updateCategory_productsRequest(id, category)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategory_products = async (id) => {
        try {
            const res = await deleteCategory_productsRequest(id)
            if (res.status === 204) setCategory_products(Category_products.filter(category => category.ID_CATEGORIA_PRODUCTO !== id))
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <CategoryProductsContext.Provider value={{
            Category_products,
            getCategory_products,
            getOneCategory_products,
            createCategory_products,
            updateCategory_products,
            deleteCategory_products
        }}>
            {children}
        </CategoryProductsContext.Provider>
    );
}