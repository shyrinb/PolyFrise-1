const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Personnalite extends Sequelize.Model {}

Personnalite.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255)
    },
    date_naissance: {
        type: DataTypes.INTEGER
    },
    date_fin: {
        type: DataTypes.INTEGER
    },
    biographie: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Personnalite',
    tableName: 'personnalites',
    timestamps: false
});

module.exports = Personnalite;