const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Event = require('./Event');

class Category extends Sequelize.Model {}

Category.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
});

Category.belongsToMany(Event, {
    through: 'category_event',
    as: 'events',
    foreignKey: 'category_id',
    otherKey: 'event_id',
    timestamps: false
});

Event.belongsToMany(Category, {
    through: 'category_event',
    as: 'categories',
    foreignKey: 'event_id',
    otherKey: 'category_id',
    timestamps: false
});


module.exports = Category;