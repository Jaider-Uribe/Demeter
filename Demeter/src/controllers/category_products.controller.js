import { category_products } from "../models/category_products.model.js";
// import { products } from "../models/products.model.js";

export const getCategory_products = async (req, res) => {
    try {
        const arrayCategory_products = await category_products.findAll()
        res.json(arrayCategory_products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getOneCategory_products = async (req, res) => {
    try {
        const { id } = req.params;
        const oneCategory_products = await category_products.findOne({
            where: {
                Id_Category: id
            }
        });

        if (!oneCategory_products) return res.status(404).json({ message: 'Este id no existe' });
        res.json(oneCategory_products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createCategory_products = async (req, res) => {
    
    try {
        const { Name } = req.body

        const newCategory_products = new category_products({
            Name,
            State: true,
        })
        
        await newCategory_products.save();
        res.json(newCategory_products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const disableCategory_products = async (req, res) => {
    try {
        const { id } = req.params;

        const categoryProducts = await category_products.findOne({
            where: {
                Id_Category: id
            }
        });

        if (!categoryProducts) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        const updatedCategoryProduct = await categoryProducts.update({ State: !categoryProducts.State });

        res.json(updatedCategoryProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCategory_products = async (req, res) => {

    try {
        const { id } = req.params;
        const { Name } = req.body

        const updateCategory_products = await category_products.findByPk(id)
        updateCategory_products.Name = Name;

        await updateCategory_products.save();
        res.json(updateCategory_products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCategory_products = async (req, res) => {
    try {
        const { id } = req.params;

        await category_products.destroy({
            where: {
                Id_Category: id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// export const getProducts_Category = async (req, res) => {
//     const { id } = req.params;
//     const arrayProducts = await products.findAll({
//         where: {
//             Id_Category: id
//         }
//     });
//     res.json(arrayProducts);
// }