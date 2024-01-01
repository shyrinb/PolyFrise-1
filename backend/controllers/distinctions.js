const Distinction = require('../models/Distinctions');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Distinction`);

    Distinction.findAll()
        .then((distinctions) => {
            res.status(201).json(distinctions);
        })
        .catch((error) => {
            console.error(`Failed to find distinctions`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
