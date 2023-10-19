import { suppliesCategory } from "../models/suppliescategory.model.js";
import { supplies } from "../models/supplies.model.js";

export const getCategory_supplies = async (req, res) => {
    try {
        const arrayCategory_supplies = await suppliesCategory.findAll()
        res.json(arrayCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getOneCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;
        const oneCategory_supplies = await suppliesCategory.findOne({
            where: {
                ID_SuppliesCategory: id
            }
        });

        if (!oneCategory_supplies) return res.status(404).json({ message: 'Este id no existe' });
        res.json(oneCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCategory_supplies = async (req, res) => {
    
    try {
        const { Name_SuppliesCategory } = req.body
        const newCategory_supplies = await suppliesCategory.create({
            Name_SuppliesCategory,
            State: true,
        });
        res.json(newCategory_supplies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const disableCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        const categorySupply = await suppliesCategory.findOne({
            where: {
                ID_SuppliesCategory: id
            }
        });

        if (!categorySupply) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedCategorySupply = await categorySupply.update({ State: !categorySupply.State });

        res.json(updatedCategorySupply);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
 
export const updateCategory_supplies = async (req, res) => {

    try {
        const { id } = req.params;
        const { Name_SuppliesCategory} = req.body

        const updateCategory_supplies = await suppliesCategory.findByPk(id)
        updateCategory_supplies.Name_SuppliesCategory = Name_SuppliesCategory;
        await updateCategory_supplies.save();

        res.json(updateCategory_supplies);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCategory_supplies = async (req, res) => {
    try {
        const { id } = req.params;

        await suppliesCategory.destroy({
            where: {
                ID_SuppliesCategory: id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSupplies_Category = async (req, res) => {
    const { id } = req.params;
    const arraySupplies = await supplies.findAll({
        where: {
            ID_SuppliesCategory: id
        }
    });
    res.json(arraySupplies);
}