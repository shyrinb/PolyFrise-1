// controllers/apiController.js
const db = require('../models'); // Assurez-vous que cela pointe vers vos modèles MySQL
const { Avancees, Entreprises, Programmes, Personnalite,Evenements_historiques,Evenements_informatique,Distinctions,Generation_informatique,Domaines,Category } = require('../models');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const { Op } = require('sequelize');  // Assurez-vous que vous importez Op depuis sequelize, si vous l'utilisez

exports.getEvenementsDomaine = (req, res) => {
  const sql = 'SELECT * FROM evenements_domaine';
  db.query(sql, (err, result) => handleQueryResult(err, res, result));
};

exports.getTimeline= (req, res) => {
  res.json({ message: 'Timeline ' });
};

//--------

exports.getDataByCategories = async (req, res) => {
  const selectedCategories = req.body.categories;

  console.log('Données reçues du frontend :', req.body);
  console.log('Catégories reçues du frontend :', selectedCategories);
  try {
    let selectedTable;

    // Déterminez quelle table interroger en fonction de la catégorie sélectionnée
    switch (selectedCategories) {
      case 'avancees':
        selectedTable = require('../models/Avancees'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'personnalites':
        selectedTable = require('../models/Personnalite'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'programmes':
        selectedTable = require('../models/Programmes'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'entreprises':
        selectedTable = require('../models/Entreprises'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'evenements_historique':
        selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'evenements_informatiques':
        selectedTable = require('../models/Evenements_informatique'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'domaines':
        selectedTable = require('../models/Domaines'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'distinctions':
        selectedTable = require('../models/Distinctions'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'generations_informatiques':
        selectedTable = require('../models/Generation_informatique'); // Remplacez par le chemin correct de votre modèle
        break;
      default:
        return res.status(400).json({ error: 'Catégorie non valide' });
    }

    // Assurez-vous que vous utilisez la colonne 'category' pour correspondre à votre condition
    const timelineData = await selectedTable.findAll();
    res.json(timelineData);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};


exports.getDomaines = async (req, res) => {
  try {
    const domaines = await Domaines.findAll();
    res.json(domaines);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getAvancees = async (req, res) => {
  try {
    const avancees = await Avancees.findAll();
    res.json(avancees);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getGenerationsInformatique =  async (req, res) => {
  try {
    const geninfo = await Generation_informatique.findAll();
    res.json(geninfo);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getEntreprises = async (req, res) => {
  try {
    const entreprises = await Entreprises.findAll();
    res.json(entreprises);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getPersonnalites = async (req, res) => {
  try {
    const personnalites = await Personnalite.findAll();
    res.json(personnalites);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getProgrammes = async (req, res) => {
  try {
    const programmes = await Programmes.findAll();
    res.json(programmes);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getEvenementsInformatiques =async (req, res) => {
  try {
    const evenementsinfo = await Evenements_informatique.findAll();
    res.json(evenementsinfo);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getEvenementsHistoriques = async (req, res) => {
  try {
    const evenementhisto = await Evenements_historiques.findAll();
    res.json(evenementhisto);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getDistinctions = async (req, res) => {
  try {
    const distinctions = await Distinctions.findAll();
    res.json(distinctions);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll();
    res.json(submissions);
  } catch (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.signup = (req, res, next) => {
  console.log("signup apiControllers.js");
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

exports.deconnexion = (req, res, next) => {
  console.request(req, `Deconnexion user`)
};

// Fonction utilitaire pour gérer le résultat de la requête
function handleQueryResult(err, res, result) {
  if (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  } else {
    res.json(result);
  }
}