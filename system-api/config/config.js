const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.DB_TYPE === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE,
       
        pool: {
            max: 5,
            min: 0,
            idle: 10000, 
            acquire: 30000, 
        },
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
           
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
                acquire: 30000,
            },
        }
    );
}

module.exports = sequelize;
