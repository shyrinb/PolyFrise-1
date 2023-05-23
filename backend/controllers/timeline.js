const { Sequelize } = require("sequelize");
const Event = require("../models/Event");
const Category = require('../models/Category');

exports.get = (req, res, next) => {
    console.request(
        req,
        `Get Category`,
        `categories : ${req.body.categories}`,
        `startDate : ${req.body.startDate}`,
        `endDate : ${req.body.endDate}`
    )

    Event.findAll({
        where: {
          date: {
            [Sequelize.Op.between]: [new Date(req.body.startDate), new Date(req.body.endDate)]
          }
        },
        include: [
          {
            model: Category,
            as: 'categories',
            where: {
                    id: req.body.categories
                },
                through: { attributes: [] }, // Exclure les attributs de la table d'association
                attributes: ['id']
          }
        ]
      })
        .then((events) => {
            res.status(201).json(events);
        })
        .catch((error) => {
            console.error(`fail to find events`, error)
            res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` })
        });
};