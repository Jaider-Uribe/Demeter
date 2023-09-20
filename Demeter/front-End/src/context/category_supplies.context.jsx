import { createContext, useContext, useState } from "react";
import { getCategory_suppliesRequest, getOne_Category_suppliesRequest, createCategory_suppliesRequest, disableCategory_suppliesRequest } from "../api/category_supplies.request";

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
    }

    const toggleCategorySupplyStatus = async (id) => {
        try {
            const res = await disableCategory_suppliesRequest(id);

            if (res.status === 200) {
                setCategory_supplies((prevcategorySupplies) =>
                prevcategorySupplies.map((category) =>
                        category.ID_CATEGORIA_INSUMO === id ? { ...category, habilitado: !category.habilitado } : category
                    )
                );
            }
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
            toggleCategorySupplyStatus
        }}>
            {children}
        </CategorySuppliesContext.Provider>
    );
}