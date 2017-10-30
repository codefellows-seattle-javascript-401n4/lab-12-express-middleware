'use strict';

const app = require('express')();
const jsonParser = require('body-parser').json();
const send = require('./response');
const Note = require('../models/note');
const notes = __dirname + '/../models/notes.json';
const storage = require('./storage')(notes);
const parser = require('./parse');
const createError = require('http-errors');
const cors = require('./cors-middle');

app.use((req, res, next) => {

  parser(req);
  next();

});

app.get('/api/notes', (req, res, next) => {
  
  let id = req.url && req.url.query && req.url.query.id;
  

  if(id) {

    Note.fetchNote(id)
    //console.log(storage.getItem());
      .then(note => send.json(res, 200, note))
      .catch(() => next(createError(400, 'Invalid ID')));

  } else {

    Note.fetchIDs()
      .then(i => send.json(res, 200, i))
      .catch(() => next(createError(400, 'Server Error')));

  }

});


app.post('/api/notes', jsonParser, (req, res, next) => {

  if(! req.body.title) next(createError(400, 'No Title Given!'));
  if(! req.body.content) next(createError(400, 'No Content Given!'));

  let note = new Note(req.body);
  storage.saveItem(note)
    .then(jsonRes => send.json(res, 200, jsonRes))
    .catch(() => next(createError(500, 'Server Error')));
});


app.delete('/api/notes', (req, res, next) => {

  let id = req.url.query.id;

  if(id){

    storage.deleteItem(id)
      .then(send.json(res, 204))
      .catch(() => next(createError(500, 'Server Error')));

  } else {
    next(createError(400, 'Bad Request'));
  }


});

app.get('*', (req, res, next) => {

  next(createError(404, 'Page Does Not Exist!'));

});

app.use(cors);

app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.status).send(err.message);
  next();
});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};



