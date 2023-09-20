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
        allowNull: false, 
        unique: true, 
        validate: {
            customValidate(value) {
                if (!/^[A-Z][a-z]*$/.test(value)) {
                    throw new Error('El nombre de la categoria debe tener solo la primera letra en mayúscula y las siguientes en minúscula.');
                }
            },
        },
    },
    habilitado: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
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

