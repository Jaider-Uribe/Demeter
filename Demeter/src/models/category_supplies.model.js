import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
import { supplies } from "./supplies.model.js";

export const category_supplies = sequelize.define('SUPPLIES_CATEGORY', {
    Id_Category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
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
    State: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    timestamps: false
});

category_supplies.hasMany(supplies, {
    foreignKey: 'Category_Id',
    sourcekey: 'Id_Category'
});

supplies.belongsTo (category_supplies, {
    foreignKey: 'Category_Id',
    target: 'Id_Category'
});

