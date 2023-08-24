import { createContext, useContext, useState } from "react";
import { getCategory_suppliesRequest, getOne_Category_suppliesRequest, createCategory_suppliesRequest, updateCategory_suppliesRequest, deleteCategory_suppliesRequest } from "../api/category_supplies.request";

const CategorySuppliesContext = createContext();

export const useCategorySupplies = () => {
    const context = useContext(CategorySuppliesContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de categoria de insumos");

    return context;
}

export function CategorySupplies({ children }) {
    const [Category_supplies, setCategory_supplies] = useState([]);

    const getCategory_supplies = async () => {
        try {
            const res = await getCategory_suppliesRequest();
            setCategory_supplies(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getOneCategory_supplies = async (id) => {
        try {
            const res = await getOne_Category_suppliesRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createCategory_supplies = async (category) => {
        const res = await createCategory_suppliesRequest(category)
        console.log(res);
    }

    const updateCategory_supplies = async (id, category) => {
        try {
            await updateCategory_suppliesRequest(id, category)
        } catch (error) {
            console.error(error);
        }
    }

    const deleteCategory_supplies = async (id) => {
        try {
            const res = await deleteCategory_suppliesRequest(id)
            if (res.status === 204) setCategory_supplies(Category_supplies.filter(category => category.ID_CATEGORIA_INSUMO !== id))
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <CategorySuppliesContext.Provider value={{
            Category_supplies,
            getCategory_supplies,
            getOneCategory_supplies,
            createCategory_supplies,
            updateCategory_supplies,
            deleteCategory_supplies
        }}>
            {children}
        </CategorySuppliesContext.Provider>
    );
}