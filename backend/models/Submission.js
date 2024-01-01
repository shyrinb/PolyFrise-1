const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./Category');
const Event = require('./Event');
const Avancee = require('./Avancees');
const Distinction = require('./Distinctions');
const Domaine = require('./Domaines');
const Entreprise = require('./Entreprises');
const EvenementDomaine = require('./Evenements_domaine');
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
    otherKey: 'category_id',
    timestamps: false
});

// Définissez la relation entre Submission et Event
Submission.belongsTo(Event, { as: 'event', foreignKey: 'event_id' });
Submission.belongsTo(Avancee, { as: 'avancee', foreignKey: 'avancee_id' });
Submission.belongsTo(Distinction, { as: 'distinction', foreignKey: 'distinction_id' });
Submission.belongsTo(Domaine, { as: 'domaine', foreignKey: 'domaine_id' });
Submission.belongsTo(Entreprise, { as: 'entreprise', foreignKey: 'entreprise_id' });
Submission.belongsTo(EvenementDomaine, { as: 'evenement_domaine', foreignKey: 'evenement_domaine_id' });
Submission.belongsTo(EvenementHistorique, { as: 'evenement_historique', foreignKey: 'evenement_historique_id' });
Submission.belongsTo(EvenementInformatique, { as: 'evenement_informatique', foreignKey: 'evenement_informatique_id' });
Submission.belongsTo(Programme, { as: 'programme', foreignKey: 'programme_id' });
Submission.belongsTo(GenerationInformatique, { as: 'generation_informatique', foreignKey: 'generation_informatique_id' });
Submission.belongsTo(Personnalite, { as: 'personnalite', foreignKey: 'personnalite_id' });

module.exports = Submission;
