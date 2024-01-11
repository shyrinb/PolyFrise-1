// routes/apiRoutes.js
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {
  getSubmissions,
  signup, // Importez la fonction signup depuis le contrôleur
  login,
  deconnexion,
  getCategory,
  getTimeline,
  getGenerationsInformatique,
  getEvenementsInformatiques,
  getEvenementsHistoriques,
  getDomaines,
  getAvancees,
  getDistinctions,
  getEntreprises,
  getPersonnalites,
  getProgrammes,
  getDataByCategories
} = require('../controllers/apiControllers');

// Routes pour récupérer les données
router.get('/submissions', getSubmissions);
router.get('/generationsinformatique', getGenerationsInformatique);
router.get('/evenementsinformatiques', getEvenementsInformatiques);
router.get('/evenementshistoriques', getEvenementsHistoriques);
router.get('/domaines', getDomaines);
router.get('/category', getCategory);
router.get('/avancees', getAvancees);
router.get('/distinctions', getDistinctions);
router.get('/entreprises', getEntreprises);
router.get('/personnalites', getPersonnalites);
router.get('/programmes', getProgrammes);
router.get('/timeline', getTimeline);
router.post('/databycategory', getDataByCategories );

// Routes pour l'authentification
router.post('/inscription', signup);
router.post('/connexion', login);
router.post('/deconnexion', deconnexion);

module.exports = router;