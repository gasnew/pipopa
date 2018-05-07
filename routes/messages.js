var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var recipient = await models.User.find({where: {name: req.body.recipient}});

    // Receive message
    // {
    //   path: '/../../..wav',
    //   recipient: 'jesse',
    // }

    var path = './audio/12345.wav';
    models.Message.create({
      path: path,
      senderId: user.id,
      recipientId: recipient.id,
    });

    res.send('Good on ya, mate!');
  } catch(e) {
    console.error(e);
    res.statusCode = 422;
    res.send('Dude, not cool');
  }
});

router.get('/waiting', async function(req, res) {
  try {
    var user = await models.User.find({where: {name: req.user.name}});
    var messages = await user.getWaitingMessages();

    res.json({
      messages: messages,
    });
  } catch(e) {
    console.error(e);
    res.statusCode = 500;
    res.send('I\'ve made a terrible mistyachk!');
  }
});

