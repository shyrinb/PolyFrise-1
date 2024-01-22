const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
          console.error(`Échec du hachage du mot de passe : ${error}`);
          res.status(500).json({ error: "ErrDefault", message: `Erreur serveur` });
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
                        console.log("User status:",user.status);
                        res.status(200).json({
                          login: req.body.login,
                          status: user.status, // Ajoutez le statut de l'utilisateur ici
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
  
  exports.getUserInfo =(req, res, next) => {
    // Obtenez les informations de l'utilisateur à partir du token ou d'autres moyens
    const token = req.headers.authorization.split(' ')[1]; // Assurez-vous d'adapter cela à votre authentification
    const decodedToken = jwt.verify(token, `${process.env.AUTH_KEY}`);
    const login = decodedToken.login;
  
    // Recherchez l'utilisateur dans la base de données
    User.findOne({ where: { login: login } })
      .then((user) => {
        if (!user) {
          console.error(`User [${login}] not found`);
          return res.status(404).json({ error: "ErrUserNotFound", message: `Utilisateur non trouvé` });
        } else {
          console.log(`User [${login}] info retrieved`);
          res.status(200).json({
            login: user.login,
            status: user.status,
            // Ajoutez d'autres informations de l'utilisateur si nécessaire
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "ErrDefault", message: `Erreur BDD` });
      });
  };
  
  exports.deconnexion = (req, res, next) => {
    console.request(req, `Deconnexion user`)
  };
  