var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Room = require('../models/Room');
var jwt = require('jsonwebtoken');

// router.get('/', (req, res) => {
//   res.render('index')
// });

router.post('/createRoom', (req, res) => {
  Room.createRoom(req.body.roomName, req.body.roomPassword)
    .then((room) => {
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


module.exports = router;