const Personnalite = require('../models/Personnalite');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Personnalite`);

    Personnalite.findAll()
        .then((personnalites) => {
            res.status(201).json(personnalites);
        })
        .catch((error) => {
            console.error(`Failed to find personnalites`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
