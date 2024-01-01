const express = require('express');
const router = express.Router();

const evenementHistoriqueCtrl = require('../controllers/evenements_historiques');

router.get('/', evenementHistoriqueCtrl.getAll);

module.exports = router;
