const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Evenement extends Sequelize.Model {}

Evenement.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    date: {
        type: DataTypes.DATE,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'Evenement',
    tableName: 'evenement',
    timestamps: false // désactiver les colonnes createdAt et updatedAt

});

module.exports = Evenement;