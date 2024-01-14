const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');
class Submission extends Sequelize.Model {}

Submission.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      submission_type: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      submitted_by: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      submission_data: {
        type: DataTypes.JSON,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    },  {
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
    timestamps: false
});

module.exports = Submission;
