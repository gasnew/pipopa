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
      res.json({thing: 'YOUR ACTION IS INVALID'});
      //TODO return the turn up to the valid action
      //(another player may have invalidated the turn as well)
    });
});

router.get('/submit', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();
    var result = await turn.simulate();
    await turn.finish();

    var newTurn = await models.Turn.create({status: 'running'});
    await player.addTurn(newTurn);

    res.json(result);
  } catch(e) {
    console.error(e);
    res.json(e);
  }
});

module.exports = router;

