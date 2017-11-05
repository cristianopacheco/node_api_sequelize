const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

// not found
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

// handle errors
app.use((err, req, res) => {
  res.status(err.status || 500);
  const data = { message: err.message };
  res.json(data);
});

module.exports = app;
