var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new-action', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();
    var turn_obj = await turn.integrateAction(req.body);
    res.json(turn_obj);
  } catch(e) {
    console.error(e);
    res.json({thing: 'YOUR ACTION IS INVALID'});
  }
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

