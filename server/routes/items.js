var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ToDoItem = require('../models/ToDoItem');

router.post('/addItem', (req, res) => {
  ToDoItem.addItem(req.body.content, 0, 'admin', req.room._id)
    .then((item) => {
      res.json(item);
    });
});

router.get('/getItems', (req, res) => {
  ToDoItem.getItems(req.room._id)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.json(err);
    })
});


/*router.get('/getItems', (req, res) => {
  var token = req.headers['x-access-token'];
  if (!token) {
    res.json({success: false, message: 'No token provided'});
  } else {
    jwt.verify(token, 'secret', (err, decoded) => {
      ToDoItem.getItems()
    });
  }
});*/

module.exports = router;