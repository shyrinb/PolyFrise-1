const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Programme extends Sequelize.Model {}

Programme.init({
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
        type: DataTypes.DATEONLY
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Programme',
    tableName: 'programmes',
    timestamps: false
});

module.exports = Programme;
