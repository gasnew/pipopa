var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new-action', function(req, res) {
  models.User.find({where: {name: req.user.name}})
  .then(u => u.getPlayer())
  .then(p => p.getCurrentTurn())
  .then(t => t.validateAction(req.body))
  .then(turn_obj => res.json(turn_obj));
});

module.exports = router;

