import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'demeteruno',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)