const { v4: uuidv4 } = require('uuid');
const sequelize = require('../database');
const Category = require('../models/Category');
const Submission = require('../models/Submission');
const Event = require('../models/Event');
const Avancee = require('../models/Avancees');
const Distinction = require('../models/Distinctions');
const Domaine = require('../models/Domaines');
const Entreprise = require('../models/Entreprises');
const EvenementDomaine = require('../models/Evenements_domaine');
const EvenementHistorique = require('../models/Evenements_historiques');
const EvenementInformatique = require('../models/Evenements_informatique');
const Evenement = require('../models/Programmes');
const GenerationInformatique = require('../models/Generation_informatique');
const Personnalite = require('../models/Personnalite');

exports.modify = (req, res, next) => {
    console.request(req, `Add modify submission`);

    const requiredFields = ['date', 'title', 'description', 'event_id', 'categories', 'type', 'table', 'submission_id'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }

    const id = uuidv4();

    // Define the model dynamically based on the 'table' field
    const Model = getModelByTableName(req.body.table);

    if (!Model) {
        res.status(400).json({ "error": "TableNotFoundError", "message": `Table not found: ${req.body.table}` });
        return;
    }

    Model.update({
        new_date: req.body.date,
        new_title: req.body.title,
        new_description: req.body.description,
        event_id: req.body.event_id
    }, {
        where: { id: req.body.submission_id }
    }).then((rowsUpdated) => {
        if (rowsUpdated > 0) {
            // Fetch the updated submission and set categories
            Model.findByPk(req.body.submission_id).then((submission) => {
                if (submission) {
                    submission.setCategories(req.body.categories)
                        .then(() => {
                            console.log(`submission [${id}] updated`);
                            res.status(200).end();
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
                        });
                } else {
                    res.status(404).json({ "error": "SubmissionNotFoundError", "message": "Submission not found" });
                }
            });
        } else {
            res.status(404).json({ "error": "SubmissionNotFoundError", "message": "Submission not found" });
        }
    }).catch((error) => {
        console.error(`Update submission failed`, error);
        res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
    });
}

exports.create = (req, res, next) => {
    console.request(req, `Create submission`);

    // Validate request body
    const requiredFields = ['date', 'title', 'description', 'event_id', 'categories', 'type', 'table'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: 'ValidationError', message: `Missing required field: ${field}` });
        }
    }

    // Generate UUID for the new submission
    const id = uuidv4();

    // Dynamically define model based on the 'table' field
    const Model = getModelByTableName(req.body.table);

    if (!Model) {
        return res.status(400).json({ error: 'TableNotFoundError', message: `Table not found: ${req.body.table}` });
    }

    // Create submission
    Model.create({
        id: id,
        type: req.body.type,
        new_date: req.body.date,
        new_title: req.body.title,
        new_description: req.body.description,
        event_id: req.body.event_id
    }).then((submission) => {
        // Set categories if applicable
        submission.setCategories(req.body.categories)
            .then(() => {
                console.log(`Submission [${id}] created for table ${req.body.table}`);
                res.status(200).json(submission);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
            });
    }).catch((error) => {
        console.error('Create submission failed', error);
        res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
    });
};

exports.delete = (req, res, next) => {
    console.request(req, `Add delete submission`);

    const requiredFields = ['submission_id', 'table'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }

    // Define the model dynamically based on the 'table' field
    const Model = getModelByTableName(req.body.table);

    if (!Model) {
        res.status(400).json({ "error": "TableNotFoundError", "message": `Table not found: ${req.body.table}` });
        return;
    }

    Model.destroy({
        where: { id: req.body.submission_id }
    }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            console.log(`submission [${req.body.submission_id}] deleted`);
            res.status(200).end();
        } else {
            res.status(404).json({ "error": "SubmissionNotFoundError", "message": "Submission not found" });
        }
    }).catch((error) => {
        console.error(`Delete submission failed`, error);
        res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
    });
}
exports.getAll = (req, res, next) => {
    console.request(req, `GetAll submission`)

    Submission.findAll({
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: Category,
                as: 'categories',
                through: { attributes: [] }, // Exclure les attributs de la table d'association
                attributes: ['id']
            }, {
                model: Event,
                as: 'event'
            }]
        })
        .then((submissions) => {
            res.status(200).json(submissions);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
        });
}

exports.accept = async(req, res, next) => {
    console.request(req, `Accept submission`)
    var fail = []

    for (var submissionId in req.body.ids) {

        var submissionId = req.body.ids[submissionId];

        await Submission.findByPk(submissionId, {
                include: [{
                        model: Category,
                        as: 'categories',
                        through: { attributes: [] }, // Exclure les attributs de la table d'association
                        attributes: ['id']
                    },
                    {
                        model: Event,
                        as: 'event'
                    }
                ]
            })
            .then((submission) => {
                if (!submission) {
                    console.error(`submission ${submissionId} doesn't exist`);
                    return fail.push(submissionId)
                }

                switch (submission.type) {
                    case "UPDATE":
                        try {
                            processUpdateSubmission(submission).then(() => submission.destroy())
                        } catch (error) {
                            console.error(`fail to process update submission ${submissionId}`, error);
                            fail.push(submissionId)
                        }
                        break;
                    case "CREATE":
                        try {
                            processCreateSubmission(submission).then(() => submission.destroy())
                        } catch (error) {
                            console.error(`fail to process create submission ${submissionId}`);
                            fail.push(submissionId)
                        }
                        break;
                    case "DELETE":
                        try {
                            processDeleteSubmission(submission).then(() => submission.destroy())
                        } catch (error) {
                            console.error(`fail to process delete submission ${submissionId}`);
                            fail.push(submissionId)
                        }
                        break;
                    default:
                        console.error(`fail to detecte type of submission ${submissionId}`);
                        fail.push(submissionId)
                        break;
                }
            })
            .catch((error) => {
                console.error(error);
                fail.push(submissionId)
            });



    }

    if (fail.length !== 0) {
        res.status(500).json({ error: "ServerError", message: `Erreur BDD on submission ${fail}` });
    } else {
        res.status(200).json();
    }
}

async function processUpdateSubmission(submission) {
    submission.event.date = submission.new_date;
    submission.event.title = submission.new_title;
    submission.event.description = submission.new_description;
    submission.event.setCategories(submission.categories)

    await submission.event.save();
    console.log(`Event ${submission.event.id} updated`);

}


async function processCreateSubmission(submission) {
    const id = uuidv4();
    const event = await Event.create({
        id: id,
        date: submission.new_date,
        title: submission.new_title,
        description: submission.new_description,
    })
    event.setCategories(submission.categories)
    await submission.save();
    console.log(`Event ${id} created`);

}

async function processDeleteSubmission(submission) {
    await Submission.destroy({ where: { event_id: submission.event_id } })
    await submission.event.destroy();
    console.log(`Event ${submission.event.id} deleted`);
}

exports.reject = async(req, res, next) => {
    console.request(req, `Reject submission`)
    var fail = []

    for (var submissionId in req.body.ids) {

        var submissionId = req.body.ids[submissionId];

        await Submission.findByPk(submissionId, {
            include: [{
                    model: Category,
                    as: 'categories',
                    through: { attributes: [] }, // Exclure les attributs de la table d'association
                    attributes: ['id']
                },
                {
                    model: Event,
                    as: 'event'
                }
            ]
        }).then((submission) => {
            if (!submission) {
                console.error(`submission ${submissionId} doesn't exist`);
                return fail.push(submissionId)
            }
            submission.destroy().then(() => {
                console.log(`submission ${submission.id} deleted`);
            }).catch((error) => {
                console.error(error);
                fail.push(submissionId)
            })
        }).catch((error) => {
            console.error(error);
            fail.push(submissionId)
        });

    }
    if (fail.length !== 0) {
        res.status(500).json({ error: "ServerError", message: `Erreur BDD on submission ${fail}` });
    } else {
        res.status(200).json();
    }
}

function getModelByTableName(tableName) {
    switch (tableName) {
        case 'events':
            return Event;
        case 'avancees':
            return Avancee;
        case 'distinctions':
            return Distinction;
        case 'domaines':
            return Domaine;
        case 'entreprises':
            return Entreprise;
        case 'evenements_domaines':
            return EvenementDomaine;
        case 'evenements_historiques':
            return EvenementHistorique;
        case 'evenements_informatiques':
            return EvenementInformatique;
        case 'evenements':
            return Evenement;
        case 'generations_informatique':
            return GenerationInformatique;
        case 'personnalites':
            return Personnalite;
        default:
            return null;
    }
}