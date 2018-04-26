var jwt = require('jsonwebtoken');
var Room = require('../models/Room');

var isAuthenticated = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['auth-token'] || req.headers['x-access-token'];
  // console.log('is authenticated', token);
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // console.log('decoded', decoded);
        req.room = decoded.room;
        // console.log(req.room);
        next();
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