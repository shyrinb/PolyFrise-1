const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class GenerationInformatique extends Sequelize.Model {}

GenerationInformatique.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    annee_debut: {
        type: DataTypes.INTEGER
    },
    annee_fin: {
        type: DataTypes.INTEGER
    },
    nom_generation: {
        type: DataTypes.STRING(50)
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'GenerationInformatique',
    tableName: 'generations_informatique',
    timestamps: false
});

module.exports = GenerationInformatique;
