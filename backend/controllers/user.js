const User = require('../models/User');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const bcrypt = require('bcrypt');


//TODO à faire ancien projet à adapter à notre besoin
exports.signup = (req, res, next) => {
    console.request(req, `Signup user`)

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            console.log(req.body.login);

            const user = {
                login: req.body.login,
                password: hash
            };

            User.create(user)
                .then((user) => {
                    console.log(`user [${req.body.login}] added`)
                    res.status(201).end()
                })
                .catch((error) => {
                    console.error(error)
                    console.error(`user [${req.body.login}] already exist`)
                    res.status(400).json({ "error": "ErrExistUser", "message": `user [${req.body.login}] already exist` })
                });
        })
        .catch(error => {
            console.error(`fail to ecrypt password`)
            res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` })
        });
};

exports.login = (req, res, next) => {
    console.request(req, `login user`)

    User.findOne({ where: { login: req.body.login } })
        .then((user) => {
            if (!user) {
                console.error(`user [${req.body.login}] not exist`)
                return res.status(403).json({ error: "ErrBadUser", message: `Utilisatuer incorrect` });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            console.error(`incorect password`)
                            return res.status(403).json({ error: "ErrBadPassword", message: 'Mot de passe incorrect !' });
                        }
                        console.log(`User [${req.body.login}] is logged`)
                        res.status(200).json({
                            login: req.body.login,
                            token: jwt.sign({ login: req.body.login }, `${process.env.AUTH_KEY}`, { expiresIn: '24h' })
                        });
                    })
                    .catch(error => res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` }));
            }
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ error: "ErrDefault", message: `Erreur BDD` });
        });
};