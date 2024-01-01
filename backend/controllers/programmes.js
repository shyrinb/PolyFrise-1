const Programme = require('../models/Programmes');

exports.getAll = (req, res, next) => {
    console.request(req, `GetAll Programme`);

    Programme.findAll()
        .then((programmes) => {
            res.status(201).json(programmes);
        })
        .catch((error) => {
            console.error(`Failed to find programmes`, error);
            res.status(500).json({ error: "ErrDefault", message: `Internal Server Error` });
        });
};
