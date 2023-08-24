import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'Demeter',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)