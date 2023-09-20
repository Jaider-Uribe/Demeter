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
            CATEGORIA_INSUMO_ID,
            habilitado: true 
        });

        res.json(createSupplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const disableSupplies = async (req, res) => {
    try {
        const { id } = req.params;

        const supply = await supplies.findOne({
            where: {
                ID_INSUMO: id
            }
        });

        if (!supply) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedSupply = await supply.update({ habilitado: !supply.habilitado });

        res.json(updatedSupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
