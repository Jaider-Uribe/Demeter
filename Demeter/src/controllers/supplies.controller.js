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
                ID_INSUMOS: id
            }
        });
        res.json(oneSupplie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSupplie = async (req, res) => {
    try {
        const { Nombre_Insumo, Cantidad_Insumo, Stock_Minimo, CATEGORIA_INSUMO_ID } = req.body;

        const createSupplie = await supplies.create({
            Nombre_Insumo,
            Cantidad_Insumo,
            Stock_Minimo,
            CATEGORIA_INSUMO_ID
        });

        res.json(createSupplie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSupplie = async (req, res) => { 
    const { id } = req.params;
    try {
        const updateSupplie = await supplies.findOne({
            where: {
                ID_INSUMOS: id
            }
        });

        updateSupplie.set(req.body);
        await updateSupplie.save();
        return res.json(updateSupplie);           
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteSupplie = await supplies.destroy({
            where: {
                ID_INSUMOS: id
            }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
