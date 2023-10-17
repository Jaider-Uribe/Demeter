import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';

export const supplies = sequelize.define('SUPPLIES', {
    Id_Supplies: {
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
                
                if (!/^[A-Z][a-zA-Z\s]*$/.test(value)) {
                    throw new Error('El nombre del insumo debe comenzar con mayúscula y puede contener letras y espacios.');
                }
            },
        },
    },
    Unit: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
            isInt: true, 
            min: 0, 
            max: 9999, 
        },
    },
    Measure: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            customValidate(value) {
                if (!/^[A-Za-z\s()]+$/.test(value)) {
                    throw new Error('La medida del insumo puede contener letras, espacios y paréntesis.');
                }
            },
        },
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0,  
            max: 999, 
        },
    },
    State: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    timestamps: false
});