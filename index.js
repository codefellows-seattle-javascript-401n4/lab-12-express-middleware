'use strict';
const ToDo = require('./todo/model.js');
const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const server = require('./lib/server');
const jsonParser = require('body-parser').json();
const routes = require('./todo/route');


app.post('/api/todos', jsonParser, routes.post);

app.get('/api/todos', routes.get);

app.delete('/api/todos', routes.delete);

app.use('/api/todos', (err, req, res, next) => {
  console.log(err.status, err.message);
  let status = err.status || 400;
  let message = err.message || 'oh no server error';
  res.status(status).send(message);
  next();
});

ToDo.loadAll();

server.start(app, PORT)
  .then(console.log)
  .catch(console.log);
