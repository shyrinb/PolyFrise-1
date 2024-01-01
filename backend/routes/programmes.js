const express = require('express');
const router = express.Router();

const programmeCtrl = require('../controllers/programmes');

router.get('/', programmeCtrl.getAll);

module.exports = router;
