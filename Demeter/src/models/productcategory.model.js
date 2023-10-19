import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
// import { product } from "./product.model.js";

export const productCategory = sequelize.define('ProductCategorys', {
    ID_ProductCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name_ProductCategory: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        unique: true, 
        validate: {
            customValidate(value) {
                if (!/^[A-ZÁ-Ú][a-zá-ú\s]*[a-zá-ú]$/.test(value)) {
                    throw new Error('El nombre de la categoria debe tener solo la primera letra en mayúscula y las siguientes en minúscula.');
                }
            },
        },
    },
    // Image: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         notNull: {
    //             msg: 'El estado es requerido'
    //         }
    //     }
    // },
    State: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El estado es requerido'
            }
        }
    }
}, {
    timestamps: false
});

// productCategory.hasMany(product, {
//     foreignKey: 'ProductCategory_ID',
//     sourceKey: 'ID_ProductCategory'
// })

// product.belongsTo(productCategory, {
//     foreignKey: 'ProductCategory_ID',
//     targetKey: 'ID_ProductCategory'
// })

