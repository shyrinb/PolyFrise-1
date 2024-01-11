const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {}

User.init(
  {
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user', // Définissez la valeur par défaut que vous souhaitez
    }, 
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
  }
);

module.exports = User;

