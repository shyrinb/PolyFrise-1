const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class EvenementInformatique extends Sequelize.Model {}
EvenementInformatique.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.TEXT
    },
    annee: {
        type: DataTypes.DATEONLY
    },
    evenement: {
        type: DataTypes.TEXT
    }
}, {
    
    sequelize,
    modelName: 'EvenementInformatique',
    tableName: 'evenements_informatiques',
    timestamps: false
});

module.exports = EvenementInformatique;
