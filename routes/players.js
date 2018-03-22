var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/main', async function(req, res) {
  var user = await models.User.find({where: {name: req.user.name}});
  var player = await user.getPlayer();
  res.json({
    success: true,
    content: player
  });
});

router.get('/all', async function(req, res) {
  var uid = (await models.User.find({where: {name: req.user.name}})).id;
  console.log(uid);
  var players = (await models.Player.all()).filter(p => p.UserId != uid);

  res.json({
    success: true,
    content: players
  });
});

module.exports = router;

