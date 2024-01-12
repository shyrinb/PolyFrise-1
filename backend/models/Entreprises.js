const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Entreprise extends Sequelize.Model {}

Entreprise.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255)
    },
    fondation: {
        type: DataTypes.DATEONLY
    },
    developpements_majeurs: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Entreprise',
    tableName: 'entreprises',
    timestamps: false
});

module.exports = Entreprise;