const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class EvenementHistorique extends Sequelize.Model {}
EvenementHistorique.init( {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.TEXT
    },
    date_evenement: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'EvenementHistorique',
    tableName: 'evenements_historiques',
    timestamps: false
});

module.exports = EvenementHistorique;
