const express = require('express');
const router = express.Router();

const personnaliteCtrl = require('../controllers/personnalite');

router.get('/', personnaliteCtrl.getAll);

module.exports = router;
