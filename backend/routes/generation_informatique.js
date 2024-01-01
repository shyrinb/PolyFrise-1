const express = require('express');
const router = express.Router();

const generationInformatiqueCtrl = require('../controllers/generation_informatique');

router.get('/', generationInformatiqueCtrl.getAll);

module.exports = router;
