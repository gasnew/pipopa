var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/main', async function(req, res) {
  var user = await models.User.find({where: {name: req.user.name}});
  var player = await user.getPlayer();
  var inv = await player.getInventory({
    include: [
      {model: models.InvSlot, include: [models.Item]}
    ]
  });

  res.json({
    success: true,
    content: inv,
  });
});

module.exports = router;

