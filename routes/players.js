var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/all', function(req, res) {
  models.Player.all()
  .then(p => res.json(p));
});

module.exports = router;

