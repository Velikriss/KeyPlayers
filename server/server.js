// DEPENDENCIES
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

// ROUTES
const main = require('./routes/main.js');
const profile = require('./routes/profile.js');

// USE BLUEBIRD FOR PROMISES
mongoose.Promise = require('bluebird');

// START EXPRESS SERVER AND MONGODB
const app = express();
mongoose.connect('mongodb://localhost/keyplayers');

// MIDDLEWARE
// TODO: implement passport
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// SERVE STATIC FILES
app.use('/public', express.static(path.join(__dirname, '/../client/')));
app.use('/bundle', express.static(path.join(__dirname, '/../dist')));

// ROUTING
app.use('/profile', profile);
app.use('/', main);

// CATCH 404 ERRORS
app.use((req, res, next) => {
  const err = new Error('Sorry--we couldn\'t find that!');
  err.status = 404;
  next(err);
});

// LISTEN
const port = process.env.port || 4000
app.listen(port, () => {
  console.log(`KeyPlayers is running on port ${port}.`);
});

module.exports = app;
