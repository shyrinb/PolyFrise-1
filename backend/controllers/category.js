const Category = require('../models/Category');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Category`)

    Category.findAll()
        .then((categories) => {
            res.status(201).json(categories);
        })
        .catch((error) => {
            console.error(`fail to find categories`, error)
            res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` })
        });
};