const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.mysqlDatabase, process.env.mysqlLogin, process.env.mysqlPassword, {
    host: process.env.mysqlHost,
    port: process.env.port,
    dialect: 'mysql',
    logging: false // Désactiver les journaux
});

module.exports = sequelize;