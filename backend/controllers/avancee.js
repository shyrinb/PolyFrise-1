const Avancee = require('../models/Avancees');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Avancee`);

    Avancee.findAll()
        .then((avancees) => {
            res.status(201).json(avancees);
        })
        .catch((error) => {
            console.error(`Failed to find avancees`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
