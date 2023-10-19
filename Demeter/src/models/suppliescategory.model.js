import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
import { supplies } from "./supplies.model.js";

export const suppliesCategory = sequelize.define('SuppliesCategorys', {
    ID_SuppliesCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name_SuppliesCategory: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        unique: true, 
        validate: {
            notNull:{
                msg: "El nombre es requerido"
            }, 
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

suppliesCategory.hasMany(supplies, {
    foreignKey: 'SuppliesCategory_ID',
    sourceKey: 'ID_SuppliesCategory'
})

supplies.belongsTo(suppliesCategory, {
    foreignKey: 'SuppliesCategory_ID',
    targetKey: 'ID_SuppliesCategory'
})

