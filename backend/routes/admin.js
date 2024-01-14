const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/connexion', userCtrl.login);
router.post('/inscription', userCtrl.signup);
router.post('/deconnexion', userCtrl.deconnexion);

module.exports = router;