const User = require('../models/User');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const bcrypt = require('bcrypt');


//TODO à faire ancien projet à adapter à notre besoin

exports.login = (req, res, next) => {
    console.request(req, `login user`, `email : ${req.body.email}`)

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.error(`user [${req.body.email}] not exist`)
                return res.status(403).json({ error: "ErrBadUser", message: `Utilisatuer incorrect` });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.error(`incorect password`)
                        return res.status(403).json({ error: "ErrBadPassword", message: 'Mot de passe incorrect !' });
                    }
                    console.log(`User [${req.body.email}] is logged`)
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, `${process.env.AUTH_KEY}`, { expiresIn: '24h' })
                    });
                })
                .catch(error => res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` }));
        })
        .catch(error => res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` }));
};



exports.getUser = (req, res, next) => {
    console.request(req, `Get a user : ${req.auth.userId}`)

    User.findOne({ _id: req.auth.userId },
            "email _id",
        ).then((user) => {
            res.status(200).json(user)
        })
        .catch(error => {
            console.error(`fail to get user`)
            res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` })
        })

};