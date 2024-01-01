const express = require('express');
const router = express.Router();

const evenementDomaineCtrl = require('../controllers/evenements_domaines');

router.get('/', evenementDomaineCtrl.getAll);

module.exports = router;
