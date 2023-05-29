const { Sequelize } = require("sequelize");
const Event = require("../models/Event");
const Category = require('../models/Category');

const { v4: uuidv4 } = require('uuid');

exports.get = (req, res, next) => {
    console.request(req, `Get Category`)

    Event.findAll({
            where: {
                date: {
                    [Sequelize.Op.between]: [new Date(req.body.startDate), new Date(req.body.endDate)]
                }
            },
            include: [{
                model: Category,
                as: 'categories',
                where: { id: req.body.categories },
                through: { attributes: [] }, // Exclure les attributs de la table d'association
                attributes: ['id']
            }]
        })
        .then((events) => {
            res.status(201).json(events);
        })
        .catch((error) => {
            console.error(`fail to find events`, error)
            res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` })
        });
};

exports.getAll = (req, res, next) => {
    console.request(req, `Get all events`)

    Event.findAll({
        order: [
            ['date', 'DESC']
        ],
        include: [{
            model: Category,
            as: 'categories',
            through: { attributes: [] }, // Exclure les attributs de la table d'association
            attributes: ['id', 'name']
        }]
    })
        .then((events) => {
            res.status(201).json(events);
        })
        .catch((error) => {
            console.error(`fail to find events`, error)
            res.status(500).json({ error: error, message: `Erreur serveur` })
        });
};

exports.getSearch = (req, res, next) => {
    console.request(req, `Get specifics events`)

    Event.findAll({
        where: {
            [Sequelize.Op.or]: [
                { date: { [Sequelize.Op.like]: `%${req.body.searchValue}%` } },
                { title: { [Sequelize.Op.like]: `%${req.body.searchValue}%` } },
                { description: { [Sequelize.Op.like]: `%${req.body.searchValue}%` } }
            ]
        },
        include: [{
            model: Category,
            as: 'categories',
            through: { attributes: [] }, // Exclure les attributs de la table d'association
            attributes: ['id', 'name']
        }]
    })
        .then((events) => {
            res.status(201).json(events);
        })
        .catch((error) => {
            console.error(`fail to find events`, error)
            res.status(500).json({ error: error, message: `Erreur serveur` })
        });
}

exports.delete = (req, res, next) => {
    console.request(req, `delete specific event`)
    Event.destroy({
        where: {
            id: req.body.event_ID
        }
    })
        .then(() => {
            res.status(201);
            console.log('Event deleted successfully');
        })
        .catch((error) => {
            console.error(`fail to delete event`, error)
            res.status(500).json({ error: error, message: `Erreur serveur` })
        });
}

exports.create = (req, res, next) => {
    console.request(req, 'add specific event')

    const requiredFields = ['date', 'title', 'description', 'categories'];
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).json({ "error": "ValidationError", "message": `Missing required field: ${field}` });
            return;
        }
    }


    const id = uuidv4();
    Event.create({
        id: id,
        date: req.body.date,
        title: req.body.title,
        description: req.body.description,
    }).then((event) => {
        event.setCategories(req.body.categories)
            .then(() => {
                console.log(`event [${id}] added`)
                res.status(201).end();
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
            });
    })
        .catch((error) => {
            console.error(`Create event failed`, error);
            res.status(500).json({ "error": "ServerError", "message": "Erreur BDD" });
        });
}