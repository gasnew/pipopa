var models = require('../models');
var express = require('express');
var router = express.Router();

var turnWatcher = {
  subscriptions: [],

  subscribe: function(sub) {
    this.subscriptions.push(sub);
  },

  dispatch: function(res) {
    for (var sub of this.subscriptions) {
      sub(res);
    }

    this.subscriptions.length = 0;
  },
};

router.post('/new-action', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();
    var turn_obj = await turn.integrateAction(req.body);

    res.json({
      success: true,
      content: turn_obj
    });
  } catch(e) {
    console.error(e);
    res.json({
      success: false,
      content: await turn.toPostObj()
    });
  }
});

router.get('/submit', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();
    var turn_obj = await turn.finish();

    var newTurn = await models.Turn.create({status: 'running'});
    await player.addTurn(newTurn);

    res.json({
      success: true,
      content: turn_obj
    });

    turnWatcher.dispatch({
      success: true,
      content: {
        turn: turn_obj,
        playerName: user.name
      }
    });
  } catch(e) {
    console.error(e);
    res.json({
      success: false,
      content: await turn.toPostObj()
    });
  }
});

router.get('/current', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();

    res.json({
      success: true,
      content: await turn.toPostObj()
    });
  } catch(e) {
    console.error(e);
    res.json({
      success: false,
      content: await turn.toPostObj()
    });
  }
});

router.get('/force-finish', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var player = await user.getPlayer();
    var turn = await player.getCurrentTurn();
    var turn_obj = await turn.finish(true);

    var newTurn = await models.Turn.create({status: 'running'});
    await player.addTurn(newTurn);

    res.json({
      success: true,
      content: turn_obj
    });
  } catch(e) {
    console.error(e);
    res.json({
      success: false,
      content: await turn.toPostObj()
    });
  }
});

router.get('/subscribe-turn-updates', function(req, res) {
  turnWatcher.subscribe((result) => {
    res.json(result);
  });
});

module.exports = router;

