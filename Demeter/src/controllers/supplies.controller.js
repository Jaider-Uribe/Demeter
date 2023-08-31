import { supplies } from "../models/supplies.model.js";

export const getSupplies = async (req, res) => {
    try {
        const ArraySupplies = await supplies.findAll();
        res.json(ArraySupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const oneSupplie = await supplies.findOne({
            where: {
                ID_INSUMO: id
            }
        });
        res.json(oneSupplie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSupplies = async (req, res) => {
    try {
        const { Nombre_Insumo, Cantidad_Insumo, Stock_Minimo, CATEGORIA_INSUMO_ID } = req.body;

        const createSupplies = await supplies.create({
            Nombre_Insumo,
            Cantidad_Insumo,
            Stock_Minimo,
            CATEGORIA_INSUMO_ID
        });

        res.json(createSupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSupplies = async (req, res) => { 
    const { id } = req.params;
    try {
        const updateSupplies = await supplies.findOne({
            where: {
                ID_INSUMO: id
            }
        });

        updateSupplies.set(req.body);
        await updateSupplies.save();
        return res.json(updateSupplies);           
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSupplies = async (req, res) => {
    
    try {
        const { id } = req.params;
        
        await supplies.destroy({
            where: {
                ID_INSUMO: id
            }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
