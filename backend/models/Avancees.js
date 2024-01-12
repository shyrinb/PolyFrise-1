const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Avancee extends Sequelize.Model {}

Avancee.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255)
    },
    date_avancee: {
        type: DataTypes.DATEONLY
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Avancee',
    tableName: 'avancees',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
});

module.exports = Avancee;