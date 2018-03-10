var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new-action', function(req, res) {
  models.User.find({where: {name: req.user.name}})
  .then(u => u.getPlayer())
  .then(p => p.getCurrentTurn())
  .then(t => t.integrateAction(req.body))
  .then(turn_obj => res.json(turn_obj))
  .catch(e => {
    console.log(e);
    res.json({thing: "YOUR ACTION IS INVALID"});
    //TODO return the turn up to the valid action
    //(another player may have invalidated the turn as well)
  });
});

module.exports = router;

