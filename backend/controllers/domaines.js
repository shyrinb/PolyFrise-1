const Domaine = require('../models/Domaines');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Domaine`);

    Domaine.findAll()
        .then((domaines) => {
            res.status(201).json(domaines);
        })
        .catch((error) => {
            console.error(`Failed to find domaines`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
