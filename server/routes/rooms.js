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
/*      var payload = {
        room: room
      };*/
      var token = jwt.sign({room: room}, 'secret');
      res.json({success: true, token: token});
    })
    .catch((err) => {
      res.json({success: false, message: err});
    });
});

router.post('/joinRoom', (req, res) => {
  Room.roomExists(req.body.roomName)
    .then((room) => {
      if (room) {
/*        var payload = {
          room: room
        };
        var token = jwt.sign(payload, 'secret');*/
        // res.session.token = token;
        // res.json({success: true, token: token, room: room});
        var token = jwt.sign({room: room}, 'secret');
        res.json({success: true, token: token});
      } else {
        res.json({success: false, message: 'Invalid room name'});
      }
    })
    .catch((err) => {
      res.json({success: false, message: 'There was an error joining the room'});
    });
});

router.get('/getRooms', (req, res) => {
  Room.getRooms()
    .then((rooms) => {
      res.json(rooms);
    })
});

router.get('/me', (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    res.json({success: false, message: 'No token provided'});
  } else {
    jwt.verify(token, 'secret', (err, decoded) => {
      res.json(decoded);
    });
  }
});


module.exports = router;