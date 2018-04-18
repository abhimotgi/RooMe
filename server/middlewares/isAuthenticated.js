var jwt = require('jsonwebtoken');
var Room = require('../models/Room');

var isAuthenticated = (req, res, next) => {
  var token = req.body.token || req.query.token;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        Room.findOne({_id: decoded.id}, (err, room) => {
          if (err) throw err;
          req.room = room;
          next();
        });
      }
    });
  } else {
      return res.status(403).json({
        success: false,
        message: 'No token provided',
      });
  }
};

module.exports = isAuthenticated;