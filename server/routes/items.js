var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ToDoItem = require('../models/ToDoItem');


router.post('/addItem', (req, res) => {
  ToDoItem.addItem(req.body.content, 0, 'admin', req.user.room);
});

router.get('/getItems', (req, res) => {
  ToDoItem.getItems(req.user.room)
    .then((items) => {
      res.json({res: 'success', data: items});
    })
    .catch((err) => {
      res.json({res: 'failure', data: err});
    })
});


module.exports = router;