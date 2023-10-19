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
                ID_Supplies: id
            }
        });
        res.json(oneSupplie);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createSupplies = async (req, res) => {
    try {
        const { Name_Supplies, Unit, Measure, Stock, SuppliesCategory_ID } = req.body;

        const createSupplies = await supplies.create({
            Name_Supplies,
            Unit,
            Measure,
            Stock,
            SuppliesCategory_ID,
            State: true 
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
                ID_Supplies: id
            }
        });

        if (!supply) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedSupply = await supply.update({ State: !supply.State });

        res.json(updatedSupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateSupplies = async (req, res) => { 
    const { id } = req.params;
    try {
        const updateSupplies = await supplies.findOne({
            where: {
                ID_Supplies: id
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
                ID_Supplies: id
            }
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
