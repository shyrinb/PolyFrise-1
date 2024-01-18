// controllers/apiController.js
const db = require('../models'); // Assurez-vous que cela pointe vers vos modèles MySQL
const { Avancees, Entreprises, Programmes, Personnalite,Evenements_historiques,Evenements_informatiques,Distinctions,Generation_informatique,Domaines,Category,Submission } = require('../models');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const { Op } = require('sequelize');  // Assurez-vous que vous importez Op depuis sequelize, si vous l'utilisez
const { v4: uuidv4 } = require('uuid');

exports.getTimeline= (req, res) => {
  try {
    console.log("getTimeline backend");
    const data = JSON.parse(req.query.data);

    const dates = data.date.split(','); // Séparez les dates si elles sont sous forme de liste
    const formattedDates = dates.map(date => new Date(date).toISOString());


    console.log('Formatted Dates:', formattedDates); // Vérifiez les dates formatées

    // Créez un nouvel objet data avec les dates au format années
    const newData = {
      categories: data.categories,
      nom: data.nom,
      dates: formattedDates,
      startDate: data.startDate,
      endDate: data.endDate,
      color: data.color,
      shape: data.shape
    };
    // Ensuite, retournez une réponse avec les données traitées
    res.json({ message: 'Timeline', newData });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur serveur', message: 'Erreur lors du traitement des données' });
  }
}

exports.getDataByCategories = async (req, res) => {
  const selectedCategories = req.body.categories;
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
      case 'evenements_historiques':
        selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'evenements_informatiques':
        selectedTable = require('../models/Evenements_informatiques'); // Remplacez par le chemin correct de votre modèle
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
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.getChampByCategorie = async (req, res) => {
  const selectedCategories = req.body.categories;
  console.log("selectedCategories backend:", selectedCategories);

  
  let selectedTable;

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
      case 'evenements_historiques':
        selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'evenements_informatiques':
        selectedTable = require('../models/Evenements_informatiques'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'domaines':
        selectedTable = require('../models/Domaines'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'distinctions':
        selectedTable = require('../models/Distinctions'); // Remplacez par le chemin correct de votre modèle
        break;
      case 'generations_informatiques':
        selectedTable = require('../models/Generation_informatique');
        break;
    default:
      return res.status(400).json({ error: 'Catégorie non valide' });
  }

  console.log("selectedTables backend:", selectedTable);
  try {
    // Obtenir les noms des colonnes de la table
    const columns = Object.keys(selectedTable.rawAttributes);

    console.log('Columns sent to frontend:', columns);
    res.json(columns);
  } catch (err) {
    console.error('Erreur :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

exports.insertDataByCategories = async (req, res) => {
  const selectedCategories = req.body.category;
  console.log("table:", selectedCategories);
  let newData = req.body; // Créez une copie de req.body pour éviter les modifications directes
  delete newData.category; // Supprimez la propriété 'category'
  console.log("insert data:", newData);

  try {
    let selectedTable;

    // Déterminez quelle table utiliser en fonction de la catégorie sélectionnée
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
        case 'evenements_historiques':
          selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'evenements_informatiques':
          selectedTable = require('../models/Evenements_informatiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'domaines':
          selectedTable = require('../models/Domaines'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'distinctions':
          selectedTable = require('../models/Distinctions'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'generations_informatiques':
          selectedTable = require('../models/Generation_informatique');
          break;
      default:
        return res.status(400).json({ error: 'Catégorie non valide' });
    }
    console.log("table ou faut ajouter les données",selectedCategories);
    // Créez une nouvelle instance de modèle avec les données fournies
    const newDataInstance = selectedTable.build(newData);

    // Insérez les données dans la base de données
    await newDataInstance.save();

    res.json({ success: true, message: 'Données insérées avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};


exports.modifDataByCategories = async (req, res) => {
  const selectedCategories = req.params.category;
  console.log("table:", selectedCategories);
  const selectedEvent = req.params.event;
  console.log("event id:", selectedEvent);
  let newData = req.body; // Créez une copie de req.body pour éviter les modifications directes

  try {
    let selectedTable;

    // Déterminez quelle table utiliser en fonction de la catégorie sélectionnée
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
        case 'evenements_historiques':
          selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'evenements_informatiques':
          selectedTable = require('../models/Evenements_informatiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'domaines':
          selectedTable = require('../models/Domaines'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'distinctions':
          selectedTable = require('../models/Distinctions'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'generations_informatiques':
          selectedTable = require('../models/Generation_informatique');
          break;
      default:
        return res.status(400).json({ error: 'Catégorie non valide' });
    }

    // Récupérez les données existantes à partir de la base de données
    const existingData = await selectedTable.findOne({ where: { id: parseInt(selectedEvent, 10) } });

    if (!existingData) {
      return res.status(404).json({ error: 'Donnée non trouvée' });
    }

    delete newData.category; // Supprimez la propriété 'category'
    delete newData.event;

    console.log("modif data:", newData);
    // Modifiez les données existantes avec les nouvelles données
    existingData.set(newData);

    // Sauvegardez les données mises à jour dans la base de données
    await existingData.save();

    res.json({ success: true, message: 'Données mises à jour avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.delDataByCategories = async (req, res) => {
  const selectedCategories = req.params.category;
  console.log("table:", selectedCategories);
  const selectedEvent = req.params.event;
  console.log("event id:", selectedEvent);
  let newData = req.body; // Créez une copie de req.body pour éviter les modifications directes

  try {
    let selectedTable;

    // Déterminez quelle table utiliser en fonction de la catégorie sélectionnée
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
        case 'evenements_historiques':
          selectedTable = require('../models/Evenements_historiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'evenements_informatiques':
          selectedTable = require('../models/Evenements_informatiques'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'domaines':
          selectedTable = require('../models/Domaines'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'distinctions':
          selectedTable = require('../models/Distinctions'); // Remplacez par le chemin correct de votre modèle
          break;
        case 'generations_informatiques':
          selectedTable = require('../models/Generation_informatique');
          break;
      default:
        return res.status(400).json({ error: 'Catégorie non valide' });
    }

   // Supprimez les données existantes de la base de données
   const deletedRowsCount = await selectedTable.destroy({ where: { id: parseInt(selectedEvent, 10) } });

   if (deletedRowsCount === 0) {
     return res.status(404).json({ error: 'Donnée non trouvée' });
   }

   res.json({ success: true, message: 'Données supprimées avec succès' });
  } catch (err) {
    console.error(err);
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
    const evenementsinfo = await Evenements_informatiques.findAll();
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

//------------------------SUBMISSION

exports.createSubmission = async (req, res, next) => {
  
  const selectedCategories = req.body.category;
  try {
    // Validate request body
    
    const submission_info = { data: req.body.submission_data, category: req.body.category} ;
    const submission_type = req.body.submission_type;
    if (!submission_type || !submission_data) {
        return res.status(400).json({ error: 'ValidationError', message: 'Missing required fields' });
    }

    // Create submission
    newData={
      submission_type: req.body.submission_type,
      submitted_by: req.body.submitted_by,
      submission_data: submission_info,
      status: 'pending',
      timestamp: req.body.timestamp
    }
      
    const newDataInstance = Submission.build(newData);

    // Insérez les données dans la base de données
    await newDataInstance.save();

    res.json({ success: true, message: 'Données insérées avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
};

exports.validateSubmission = (req, res, next) => {
  console.request(req, `Update submission`);

  const { submission_id, submission_data } = req.body;

  // Validate request body
  if (!submission_id || !submission_data) {
      return res.status(400).json({ error: 'ValidationError', message: 'Missing required fields' });
  }

  // Update submission
  Submission.update({
      submission_data: submission_data,
      status: 'approved'
  }, {
      where: { id: submission_id }
  }).then((rowsUpdated) => {
      if (rowsUpdated > 0) {
          console.log(`Submission [${submission_id}] updated`);
          res.status(200).end();
      } else {
          res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
      }
  }).catch((error) => {
      console.error(`Update submission failed`, error);
      res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
  });
};

exports.ignoreSubmission = (req, res, next) => {
  console.request(req, `Update submission`);

  const { submission_id, submission_data } = req.body;

  // Validate request body
  if (!submission_id || !submission_data) {
      return res.status(400).json({ error: 'ValidationError', message: 'Missing required fields' });
  }

  // Update submission
  Submission.update({
      submission_data: submission_data,
      status: 'rejected'
  }, {
      where: { id: submission_id }
  }).then((rowsUpdated) => {
      if (rowsUpdated > 0) {
          console.log(`Submission [${submission_id}] updated`);
          res.status(200).end();
      } else {
          res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
      }
  }).catch((error) => {
      console.error(`Update submission failed`, error);
      res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
  });
};

exports.deleteSubmission = (req, res, next) => {
  console.request(req, `Delete submission`);

  const { submission_id } = req.body;

  // Validate request body
  if (!submission_id) {
      return res.status(400).json({ error: 'ValidationError', message: 'Missing required field: submission_id' });
  }

  // Delete submission
  Submission.destroy({
      where: { id: submission_id }
  }).then((rowsDeleted) => {
      if (rowsDeleted > 0) {
          console.log(`Submission [${submission_id}] deleted`);
          res.status(200).end();
      } else {
        res.status(404).json({ error: 'SubmissionNotFoundError', message: 'Submission not found' });
      }
  }).catch((error) => {
      console.error(`Delete submission failed`, error);
      res.status(500).json({ error: 'ServerError', message: 'Erreur BDD' });
  });
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
