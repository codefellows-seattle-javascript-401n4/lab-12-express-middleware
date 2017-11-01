'use strict';
const ToDo = require('./todo/model.js');
const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const server = require('./lib/server');
const jsonParser = require('body-parser').json();
const routes = require('./todo/route');
const storageManger = require('./lib/storage');


app.post('/api/todos', jsonParser, routes.post);

app.get('/api/todos', routes.get);

app.delete('/api/todos', routes.delete);

app.use('/api/todos', (err, req, res, next) => {
  console.log(err);
  let status = err.status ;
  let message = err.message ;
  res.status(status).send(message);
  next();
});

storageManger.loadAll(ToDo)
  .then(function(){
    server.start(app, PORT)
      .then(console.log)
      .catch(console.log);
  });
