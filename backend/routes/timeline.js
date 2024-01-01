const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const timelineCtrl = require('../controllers/timeline');

router.post('/timeline', timelineCtrl.get);
router.post('/getAllTimeline', timelineCtrl.getAll);
router.post('/getSearchTimeline', auth, timelineCtrl.getSearch);
router.post('/deleteTimeline', auth, timelineCtrl.delete);
router.post('/createTimeline', auth, timelineCtrl.create);
router.post('/modifyTimeline', auth, timelineCtrl.modify);

module.exports = router;