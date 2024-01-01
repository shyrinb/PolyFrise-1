const express = require('express');
const router = express.Router();

const avanceeCtrl = require('../controllers/avancee');

router.get('/', avanceeCtrl.getAll);

module.exports = router;
