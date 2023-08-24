import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';

export const supplies = sequelize.define('INSUMOS', {
    ID_INSUMOS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre_Insumo: {
        type: DataTypes.STRING,
        required: true,
        trim: true
    },
    Cantidad_Insumo: {
        type: DataTypes.SMALLINT,
        required: true,
        trim: true
    },
    Imagen: {
        type: DataTypes.BLOB
    },
    Stock_Minimo: {
        type: DataTypes.INTEGER,
        required: true,
        trim: true
    }
}, {
    timestamps: false
});