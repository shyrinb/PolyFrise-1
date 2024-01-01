const Entreprise = require('../models/Entreprises');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Entreprise`);

    Entreprise.findAll()
        .then((entreprises) => {
            res.status(201).json(entreprises);
        })
        .catch((error) => {
            console.error(`Failed to find entreprises`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
