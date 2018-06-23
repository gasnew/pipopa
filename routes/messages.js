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
      status: 'uploading',
    });

    res.json(message);
  } catch(e) {
    console.error(e);
    res.status(422).send(e.message);
  }
});

router.post('/upload/:filename', function(req, res) {
    var filename = path.basename(req.params.filename + '.wav');
    filename = path.resolve(__dirname + '/../public/audio', filename);
    var dst = fs.createWriteStream(filename);
    console.log(filename);
    req.pipe(dst);
    console.log("\n\n\nUPLOADING NOW\n\n\n");
    dst.on('drain', function() {
      console.log('drain', new Date());
      req.resume();
    });
    req.on('end', async function () {
      console.log('drain done, yo');
      console.log("\n\n\nDONE UPLOADING\n\n\n");

      res.sendStatus(200);

      var message = await models.Message.find({where: {id: req.params.filename}});
      message.status = 'waiting';
      message.save();
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

router.get('/download/:filename', async function(req, res){
    var filename = path.basename(req.params.filename + '.wav');
    filename = path.resolve(__dirname + '/../public/audio', filename);
    if (!fs.existsSync(filename)) {
      res.sendStatus(404);
      var message = await models.Message.find({where: {id: req.params.filename}});
      message.status = 'read';
      message.save();
    } else {
      console.log("\n\n\nDOWNLOADING NOW\n\n\n");
      res.download(filename); // Set disposition and send it.
      console.log("\n\n\nDONE DOWNLOADING\n\n\n");
    }
});

router.get('/mark-read/:filename', async function(req, res){
  try {
    var message = await models.Message.find({where: {id: req.params.filename}});
    message.status = 'read';
    message.save();

    res.send(200);
  } catch(e) {
    console.error(e);
    res.statusCode = 404;
    res.send('I\'ve made a terrible mistyachk!');
  }
});

module.exports = router;
