const EvenementDomaine = require('../models/Evenements_domaine');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll EvenementDomaine`);

    EvenementDomaine.findAll()
        .then((evenementsDomaine) => {
            res.status(201).json(evenementsDomaine);
        })
        .catch((error) => {
            console.error(`Failed to find evenements_domaine`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
