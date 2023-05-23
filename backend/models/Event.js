const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');

class Event extends Sequelize.Model {}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    date: {
      type: DataTypes.DATE
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
  }
);
module.exports = Event;
