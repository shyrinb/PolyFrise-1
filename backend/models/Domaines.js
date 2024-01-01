const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Domaine extends Sequelize.Model {}

Domaine.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255)
    },
    date_creation: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Domaine',
    tableName: 'domaines',
    timestamps: false
});

module.exports = Domaine;
