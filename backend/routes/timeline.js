const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const timelineCtrl = require('../controllers/timeline');

router.post('/', timelineCtrl.get);
router.post('/getAll', timelineCtrl.getAll);
router.post('/getSearch', auth, timelineCtrl.getSearch);
router.post('/delete', auth, timelineCtrl.delete);
router.post('/create', auth, timelineCtrl.create);

module.exports = router;