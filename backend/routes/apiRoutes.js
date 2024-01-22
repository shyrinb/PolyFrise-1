// routes/apiRoutes.js
const { Router } = require('express');
const express = require('express');
const router = express.Router();


const { getDistinctions }= require('../controllers/distinctions');
const { getEvenementsInformatiques }= require('../controllers/evenements_informatiques');
const { getGenerationsInformatique }= require('../controllers/generation_informatique');
const { getSubmissions,
  validateSubmission,
  ignoreSubmission,
  createSubmission,
  deleteSubmission }= require('../controllers/submission');
const { getAvancees }= require('../controllers/avancee');
const { getDomaines }= require('../controllers/domaines');
const { getTimeline }= require('../controllers/timeline');
const { getProgrammes }= require('../controllers/programmes');
const { getPersonnalites }= require('../controllers/personnalite');
const { getEntreprises }= require('../controllers/entreprises');
const { getEvenementsHistoriques }= require('../controllers/evenements_historiques');
const { getCategory }= require('../controllers/category');
const { signup, 
  login,
  deconnexion,
  getUserInfo }= require('../controllers/user');

const {
  delDataByCategories,
  modifDataByCategories,
  getDataByCategories,
  insertDataByCategories,
  getChampByCategorie,
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

//SUBMISSION
router.get('/submissions', getSubmissions);
router.post('/add-sugg', createSubmission);
router.post('/validate-sugg', validateSubmission);
router.post('/ignorate-sugg', ignoreSubmission);
router.post('/del-sugg', deleteSubmission);

// Routes pour l'authentification
router.post('/inscription', signup);
router.post('/connexion', login);
router.get('/userinfo', getUserInfo);
router.post('/deconnexion', deconnexion);

router.post('/getchamp', getChampByCategorie);

module.exports = router;