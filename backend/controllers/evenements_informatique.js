const EvenementInformatique = require('../models/Evenements_informatique');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll EvenementInformatique`);

    EvenementInformatique.findAll()
        .then((evenements) => {
            res.status(201).json(evenements);
        })
        .catch((error) => {
            console.error(`Failed to find evenements informatiques`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
