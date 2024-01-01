const express = require('express');
const router = express.Router();

const entrepriseCtrl = require('../controllers/entreprises');

router.get('/', entrepriseCtrl.getAll);

module.exports = router;
