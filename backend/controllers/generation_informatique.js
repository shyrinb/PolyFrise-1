const GenerationInformatique = require('../models/Generation_informatique');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll GenerationInformatique`);

    GenerationInformatique.findAll()
        .then((generations) => {
            res.status(201).json(generations);
        })
        .catch((error) => {
            console.error(`Failed to find generations`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
