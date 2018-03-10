var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new-action', function(req, res) {
  //console.log(req.user);

  models.User.find({where: {name: req.user.name}})
  .then(u => u.getPlayer())
  .then(p => p.getCurrentTurn())
  .then(t => t.validateAction(req.body))
  .then(turn_obj => {
    res.json(turn_obj);
    console.log('got obj');
  });
});

module.exports = router;

