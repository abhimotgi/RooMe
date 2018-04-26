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

router.post('/removeItem/:id', (req, res) => {
  ToDoItem.removeItem(req.params.id)
    .then((removedItem) => {
      res.json(removedItem);
    })
    .catch((err) => {
      res.json({err});
    })
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

router.get('/getAllItems', (req, res) => {
  console.log('getAllItems called');
  ToDoItem.getAllItems()
    .then((items) => {
      console.log('items', items);
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
    .catch((err) => {
      res.json(err);
    })
});


module.exports = router;