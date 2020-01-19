var express = require('express');
var router = express.Router();
var eventRepo = require('../repos/eventRepo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('timeline!');
});

module.exports = router;
