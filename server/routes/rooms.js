var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Room = require('../models/Room');
var jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.render('index')
});

router.post('/createRoom', (req, res) => {
  Room.createRoom(req.body.roomName)
    .then((room) => {
      var payload = {
        room: room
      };
      var token = jwt.sign(payload, 'secret');
      res.json({success: true, token: token});
    })
    .catch((err) => {
      res.json({success: false, message: 'There was an error creating a room'});
    });
});

router.post('/joinRoom', (req, res) => {
  Room.roomExists(req.body.roomName)
    .then((room) => {
      var payload = {
        room: room
      };
      var token = jwt.sign(payload, 'secret');
      res.json({success: true, token: token});
    })
    .catch((err) => {
      res.json({success: false, message: 'There was an error joining the room'});
    });
});


module.exports = router;