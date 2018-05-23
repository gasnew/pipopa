var models = require('../models');
var express = require('express');
var path = require('path');
var fs = require('fs');
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

    message = await models.Message.create({
      senderId: user.id,
      recipientId: recipient.id,
      status: 'waiting',
    });

    res.json(message);
  } catch(e) {
    console.error(e);
    res.status(422).send(e.message);
  }
});

router.post('/upload/:filename', function (req, res) {
    var filename = path.basename(req.params.filename + '.wav');
    filename = path.resolve(__dirname + '/../public/audio', filename);
    var dst = fs.createWriteStream(filename);
    console.log(filename);
    req.pipe(dst);
    dst.on('drain', function() {
      console.log('drain', new Date());
      req.resume();
    });
    req.on('end', function () {
      console.log('drain done, yo');
      res.sendStatus(200);
    });
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

