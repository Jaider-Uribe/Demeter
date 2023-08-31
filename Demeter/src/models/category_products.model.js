import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
// import { products } from "./products.model.js";

export const category_products = sequelize.define('CATEGORIA_PRODUCTOS', {
    ID_CATEGORIA_PRODUCTO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Categoria: {
        type: DataTypes.STRING,
        required: true,
        trim: true
    },
    Imagen: {
        type: DataTypes.BLOB,
        required: false
    }
}, {
    timestamps: false
});

// category_products.hasMany(products, {
//     foreignKey: 'CATEGORIA_PRODUCTO_ID',
//     sourcekey: 'ID_CATEGORIA_PRODUCTO'
// });

// products.belongsTo (category_products, {
//     foreignKey: 'CATEGORIA_PRODUCTO_ID',
//     target: 'ID_CATEGORIA_PRODUCTO'
// });

