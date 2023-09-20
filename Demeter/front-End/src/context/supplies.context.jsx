import { createContext, useContext, useState } from "react";
import { getSuppliesRequest, getSupplieRequest, createSuppliesRequest, disableSuppliesRequest } from "../api/supplies.request";

const SuppliesContext = createContext();

export const useSupplies = () => {
    const context = useContext(SuppliesContext);

    if (!context)
        throw new Error("Ha ocurrido un error con el uso del contexto de los insumos");

    return context;
}

export function Supplies({ children }) {
    const [supplies, setSupplies] = useState([]);

    const getSupplies = async () => {
        try {
            const res = await getSuppliesRequest();
            setSupplies(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSupplie = async (id) => {
        try {
            const res = await getSupplieRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createSupplies = async (supplie) => {
        const res = await createSuppliesRequest(supplie)
        console.log(res);
    }

    const toggleSupplyStatus = async (id) => {
        try {
            const res = await disableSuppliesRequest(id);

            if (res.status === 200) {
                setSupplies((prevSupplies) =>
                    prevSupplies.map((supply) =>
                        supply.ID_INSUMO === id ? { ...supply, habilitado: !supply.habilitado } : supply
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SuppliesContext.Provider value={{
            supplies,
            getSupplies,
            getSupplie,
            createSupplies,
            toggleSupplyStatus 
        }}>
            {children}
        </SuppliesContext.Provider>
    );
}
