const express = require('express');
const router = express.Router();

const distinctionCtrl = require('../controllers/distinctions');

router.get('/', distinctionCtrl.getAll);

module.exports = router;
