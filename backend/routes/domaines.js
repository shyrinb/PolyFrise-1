const express = require('express');
const router = express.Router();

const domaineCtrl = require('../controllers/domaines');

router.get('/', domaineCtrl.getAll);

module.exports = router;
