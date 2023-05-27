const express = require('express');
const router = express.Router();

const timelineCtrl = require('../controllers/timeline');

router.post('/', timelineCtrl.get);

module.exports = router;