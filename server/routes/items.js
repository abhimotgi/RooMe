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

router.post('/toggleItem/:id', (req, res) => {
  ToDoItem.toggleItem(req.params.id)
    .then((item) => {
      res.json(item);
    })
});


module.exports = router;