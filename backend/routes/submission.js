const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const submissionCtrl = require('../controllers/submission');

router.get('/submission', auth, submissionCtrl.getAll);

router.post('/modifySubmission', submissionCtrl.modify);
router.post('/createSubmission', submissionCtrl.create);
router.post('/deleteSubmission', submissionCtrl.delete);
router.post('/acceptSubmission', auth, submissionCtrl.accept);
router.post('/rejectSubmission', auth, submissionCtrl.reject);

module.exports = router;