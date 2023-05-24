const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');
const Event = require('./Event');

class Submission extends Sequelize.Model {}

Submission.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
        allowNull: false
    },
    new_date: {
        type: DataTypes.DATE
    },
    new_title: {
        type: DataTypes.STRING
    },
    new_description: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Submission',
    tableName: 'submissions',
    timestamps: false // désactiver les colonnes createdAt et updatedAt
});

// Définissez la relation many-to-many entre Submission et Category
Submission.belongsToMany(Category, {
    through: 'submission_category',
    as: 'categories',
    foreignKey: 'submission_id',
    otherKey: 'category_id',
    timestamps: false
});

// Définissez la relation entre Submission et Event
Submission.belongsTo(Event, { as: 'event', foreignKey: 'event_id' });


module.exports = Submission;