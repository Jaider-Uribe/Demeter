import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';

export const supplies = sequelize.define('INSUMOS', {
    ID_INSUMO: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Insumo: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true, 
        validate: {
            customValidate(value) {
                if (!/^[A-Z][a-z]*$/.test(value)) {
                    throw new Error('El ombre del insumo debe tener solo la primera letra en mayúscula y las siguientes en minúscula.');
                }
            },
        },
    },
    Cantidad_Insumo: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
            isInt: true, 
            max: 9999, 
        },
    },
    Stock_Minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    habilitado: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    timestamps: false
});