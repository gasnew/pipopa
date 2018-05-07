var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/new', async function(req, res) {
  try {
    console.log('hey there');
    var user = await models.User.find({where: {name: req.user.name}});
    var recipient = await models.User.find({where: {name: req.body.recipient}});

    if (recipient === null) {
      throw new Error('Recipient "' + req.body.recipient + '" does not exist');
    }

    // Receive message
    // {
    //   recipient: 'jesse',
    // }

    await models.Message.create({
      senderId: user.id,
      recipientId: recipient.id,
      status: 'waiting',
    });

    res.send('Good on ya, mate!');
  } catch(e) {
    console.error(e);
    res.status(422).send(e.message);
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

module.exports = router;

