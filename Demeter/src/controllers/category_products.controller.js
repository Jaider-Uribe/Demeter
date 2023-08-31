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
                ID_CATEGORIA_PRODUCTO: id
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
        const { Nombre_Categoria, Imagen } = req.body

        const newCategory_products = new category_products({
            Nombre_Categoria,
            Imagen
        })

        await newCategory_products.save();
        res.json(newCategory_products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCategory_products = async (req, res) => {

    try {
        const { id } = req.params;
        const { Nombre_Categoria, Imagen } = req.body

        const updateCategory_products = await category_products.findByPk(id)
        updateCategory_products.Nombre_Categoria = Nombre_Categoria;
        updateCategory_products.Imagen = Imagen;

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
                ID_CATEGORIA_PRODUCTO: id,
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
//             CATEGORIA_PRODUCTO_ID: id
//         }
//     });
//     res.json(arrayProducts);
// }