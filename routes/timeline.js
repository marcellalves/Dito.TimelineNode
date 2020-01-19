var express = require('express');
var router = express.Router();
var timelineRepo = require('../repos/timelineRepo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  timelineRepo.loadTimeline().then(function(timeline){
    res.json(timeline);
  });
});

module.exports = router;
