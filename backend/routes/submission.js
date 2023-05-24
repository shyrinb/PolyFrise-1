const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const submissionCtrl = require('../controllers/submission');

router.get('/', auth, submissionCtrl.getAll);

router.post('/modify', submissionCtrl.modify);
router.post('/create', submissionCtrl.create);
router.post('/delete', submissionCtrl.delete);
router.post('/accept', auth, submissionCtrl.accept);

module.exports = router;