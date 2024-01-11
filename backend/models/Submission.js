const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');
const Avancee = require('./Avancees');
const Distinction = require('./Distinctions');
const Domaine = require('./Domaines');
const Entreprise = require('./Entreprises');
const EvenementHistorique = require('./Evenements_historiques');
const EvenementInformatique = require('./Evenements_informatique');
const Programme = require('./Programmes');
const GenerationInformatique = require('./Generation_informatique');
const Personnalite = require('./Personnalite');
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
    timestamps: false
});

module.exports = Submission;
