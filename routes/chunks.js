var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/main', async function(req, res) {
  // var chunk = (await models.Chunk.all({
  //   include: [{model: models.Tile}]
  // }))[0];
  var chunk = (await models.Chunk.all())[0];

  res.json({
    success: true,
    content: chunk,
  });
});

module.exports = router;

