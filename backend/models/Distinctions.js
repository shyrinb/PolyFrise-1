const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Distinction extends Sequelize.Model {}

Distinction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255)
    },
    creation: {
        type: DataTypes.INTEGER
    },
    recompense: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Distinction',
    tableName: 'distinctions',
    timestamps: false
});

module.exports = Distinction;
