const express = require('express');
const router = express.Router();

const evenementInformatiqueCtrl = require('../controllers/evenements_informatique');

router.get('/', evenementInformatiqueCtrl.getAll);

module.exports = router;
