var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var isAuthenticated = require('./middlewares/isAuthenticated.js');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomejs');
mongoose.Promise = global.Promise;


var roomsRouter = require('./routes/rooms.js')
var itemsRouter = require('./routes/items.js')
app.use('/', roomsRouter);
app.use('/', isAuthenticated, itemsRouter);

module.exports = app;