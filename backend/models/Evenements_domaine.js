const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class EvenementDomaine extends Sequelize.Model {}

EvenementDomaine.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_evenement: {
        type: DataTypes.INTEGER
    },
    id_domaine: {
        type: DataTypes.INTEGER
    },
    date_evenement: {
        type: DataTypes.DATE
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'EvenementDomaine',
    tableName: 'evenements_domaine',
    timestamps: false
});

module.exports = EvenementDomaine;

