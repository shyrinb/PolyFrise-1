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
  validateSubmission,
  ignoreSubmission,
  getGenerationsInformatique,
  delDataByCategories,
  getEvenementsInformatiques,
  getEvenementsHistoriques,
  getDomaines,
  getAvancees,
  modifDataByCategories,
  getDistinctions,
  createSubmission,
  deleteSubmission,
  getEntreprises,
  getPersonnalites,
  getProgrammes,
  getDataByCategories,
  insertDataByCategories,
  getChampByCategorie,
  getUserInfo
} = require('../controllers/apiControllers');

// Routes pour récupérer les données
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
router.post('/databycategory', getDataByCategories );
router.get('/timeline', getTimeline);

//EVENT
router.post('/add-event',insertDataByCategories);
router.put('/modify-event/:category/:event', modifDataByCategories);
router.delete('/del-event/:category/:event', delDataByCategories);

router.get('/submissions', getSubmissions);
router.post('/add-sugg', createSubmission);
router.put('/validate-sugg', validateSubmission);
router.put('/ignorate-sugg', ignoreSubmission);
router.post('/del-sugg', deleteSubmission);

// SUBMISSION A VERIFIER 

// Routes pour l'authentification
router.post('/inscription', signup);
router.post('/connexion', login);
router.get('/userinfo', getUserInfo);
router.post('/deconnexion', deconnexion);

router.post('/getchamp', getChampByCategorie);

module.exports = router;