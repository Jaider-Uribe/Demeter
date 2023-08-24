import { DataTypes } from "sequelize";
import { sequelize } from '../db/database.js';
import { supplies } from "./supplies.model.js";

export const category_supplies = sequelize.define('CATEGORIA_INSUMOS', {
    ID_CATEGORIA_INSUMO: {
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

category_supplies.hasMany(supplies, {
    foreignKey: 'CATEGORIA_INSUMO_ID',
    sourcekey: 'ID_CATEGORIA_INSUMO'
});

supplies.belongsTo (category_supplies, {
    foreignKey: 'CATEGORIA_INSUMO_ID',
    target: 'ID_CATEGORIA_INSUMO'
});