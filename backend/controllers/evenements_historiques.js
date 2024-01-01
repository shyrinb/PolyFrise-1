const EvenementHistorique = require('../models/Evenements_historiques');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll EvenementHistorique`);

    EvenementHistorique.findAll()
        .then((evenementsHistorique) => {
            res.status(201).json(evenementsHistorique);
        })
        .catch((error) => {
            console.error(`Failed to find evenements_historiques`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
