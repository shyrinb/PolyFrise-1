const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');
const Evenement = require('./Evenement');

class EvenementCategory extends Sequelize.Model {}

Evenement.init({
    category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Category,
            key: 'id'
        }
    },
    evenement_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Evenement,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'EvenementCategory',
    tableName: 'evenement_category',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
});

Evenement.belongsTo(Category, { foreignKey: 'category_id' });
Evenement.belongsTo(Evenement, { foreignKey: 'evenement_id' });

module.exports = EvenementCategory;