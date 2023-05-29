const Category = require('../models/Category');
const Submission = require('../models/Submission');
const Event = require('../models/Event');

const sequelize = require('../database');

const { v4: uuidv4 } = require('uuid');

exports.modify = (req, res, next) => {
    console.request(req, `Add modify submission`)

    const requiredFields = ['date', 'title', 'description', 'event_id', 'categories'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }


    const id = uuidv4();
    Submission.create({
            id: id,
            type: 'UPDATE',
            new_date: req.body.date,
            new_title: req.body.title,
            new_description: req.body.description,
            event_id: req.body.event_id
        }).then((submission) => {
            submission.setCategories(req.body.categories)
                .then(() => {
                    console.log(`submission [${id}] added`)
                    res.status(201).end();
                })
                .catch((error) => {
                    console.log(error)
                    Submission.destroy({ where: { id: id } })
                        .then((error) => {
                            console.error(`Adding categories on submission failed`, error);
                            res.status(400).json({ "error": "BadCategoriesError", "message": "one categories does not exist" });
                        })
                        .catch((error) => {
                            console.error(`Error deleting submission [${id}] because adding categories failed`, error);
                            res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
                        });
                });
        })
        .catch((error) => {
            console.error(`Create submission failed`, error);
            res.status(400).json({ "error": "BadEventError", "message": "eventId does not exist" });
        });
}

exports.create = (req, res, next) => {
    console.request(req, `Add create submission`)

    const requiredFields = ['date', 'title', 'description', 'categories'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }


    const id = uuidv4();
    Submission.create({
            id: id,
            type: 'CREATE',
            new_date: req.body.date,
            new_title: req.body.title,
            new_description: req.body.description,
        }).then((submission) => {
            submission.setCategories(req.body.categories)
                .then(() => {
                    console.log(`submission [${id}] added`)
                    res.status(201).end();
                })
                .catch((error) => {
                    console.log(error)
                    Submission.destroy({ where: { id: id } })
                        .then((error) => {
                            console.error(`Adding categories on submission failed`, error);
                            res.status(400).json({ "error": "BadCategoriesError", "message": "one categories does not exist" });
                        })
                        .catch((error) => {
                            console.error(`Error deleting submission [${id}] because adding categories failed`, error);
                            res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
                        });
                });
        })
        .catch((error) => {
            console.error(`Create submission failed`, error);
            res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
        });
}

exports.delete = (req, res, next) => {
    console.request(req, `Add delete submission`)

    const requiredFields = ['event_id'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }


    const id = uuidv4();
    Submission.create({
            id: id,
            type: 'DELETE',
            event_id: req.body.event_id
        }).then(() => {
            console.log(`submission [${id}] added`)
            res.status(201).end();
        })
        .catch((error) => {
            console.error(`Create submission failed`, error);
            res.status(400).json({ "error": "BadEventError", "message": "eventId does not exist" });
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