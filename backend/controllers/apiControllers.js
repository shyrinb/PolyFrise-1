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

// Fonction utilitaire pour gérer le résultat de la requête
function handleQueryResult(err, res, result) {
  if (err) {
    console.error('Erreur de requête SQL:', err);
    res.status(500).json({ error: 'Erreur de serveur' });
  } else {
    res.json(result);
  }
}
