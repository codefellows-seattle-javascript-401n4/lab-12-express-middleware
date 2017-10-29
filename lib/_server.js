'use strict';

const express = require('express');
const bodyparser = require('body-parser').json();
const send = require('./response');
const Note = require('../model/note');
const notes = __dirname + '/../model/notes.json';
const store = require('./storage')(notes);
const url = require('./url-parser');
const createError = require('http-errors');
const errorhandler = require('./error-middleware');

const app = express();

app.use((req, res, next) => {

  url.parse(req);
  next();

});

app.use((req, res, next) => {

  res.append('Access-Control-Allow-Origin', '*');
  next();

});

app.get('/api/notes', (req, res, next) => {

  let id = req.url.query.id;

  if(id) {

    Note.fetchNote(id)
    .then(note => send.json(res, 200, note))
    .catch(() => next(createError(400, 'Invalid ID')));

  } else {

    Note.fetchIDs()
    .then(ids => send.json(res, 200, ids))
    .catch(() => next(createError(500, 'Internal Server Error!')));

  }

});

app.post('/api/notes', bodyparser, (req, res, next) => {

  if(! req.body.title) next(createError(400, 'No Title Given!'));
  if(! req.body.content) next(createError(400, 'No Content Given!'));

  let note = new Note(req.body);
  store.saveNote(note)
  .then(n => send.json(res, 200, n))
  .catch(() => next(createError(500, 'Internal Server Error!')));

});

app.put('/api/notes', bodyparser, (req, res, next) => {

  if(! req.body.title) next(createError(400, 'No Title Given!'));
  if(! req.body.content) next(createError(400, 'No Content Given!'));

  let id = req.url.query.id;

  if(id) {

    Note.updateNote(id, req.body)
      .then(n => send.json(res, 200, n))
      .catch(() => next(createError(400, 'Invalid ID!')));
  }

  else next(createError(400, 'No ID Given!'));

});

app.delete('/api/notes', function(req, res) {

  let id = req.url.query.id;

  if(id){

    store.deleteItem(id)
    .then(send.json(res, 204))
    .catch(next(createError(500, 'Internal Server Error!')));

  } else {
    next(createError(400, 'No ID Provided!'));
  }

});

app.all('*', (req, res, next) => {

  next(createError(404, 'Page Does Not Exist!'));

});

app.use(errorhandler);

module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
