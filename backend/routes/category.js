const express = require('express');
const categoryCtrl = require('../controllers/category');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', categoryCtrl.getAll);

module.exports = router;