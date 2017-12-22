'use strict';



const app = require('express')();
const send = require('./response.js');
const Note = require('./models/note');
const notes = require(__dirname + '/..models/notes.json';
const jsonParser = require('body-parser').json();
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
    .then(note => send.json(res, 200, i))
    .catch(() => next(createError(400, 'server error')));
  }
});



app.post('/api/notes', jsonParser, (req, res, next) => {
  if(! req.body.title)
  next(createError(400, 'enter title'));

  if(! req.body.content)
  next(createError(400, 'enter content'));

  let note = new Note(req.body);
  storage.saveItem(note)
  .then(jsonRes => send.json(res, 200, jsonRes))
  .catch(() => next(createError(500, 'server error')));
});



app.put('/api/notes', jsonParser, (req, res, next) => {
  if(! req.body.title)
  next(createError(400, 'enter title'));

  if(! req.body.content)
  next(createError(400, 'enter content'));

  let id = req.url.query.id;

  if(id) {

    Note.updateNote(id, req.body)
    .then(upNote => send.json(res, 200, upNote))
    .catch(() => next(createError(400, 'use valid id')));
  }

  else next(createError(400, 'missing id'));
});



app.delete('/api/notes', (req, res, next) => {
  let id = req.url.query.id;

  if(id) {
    storage.deleteItem(id)
    .then(send.json(res, 204))
    .catch(() => next(createError(500, 'server error')));

  } else {
    next(createError(400, 'bad request'));
  }
});



app.get('*', (req, res, next) => {
  next(createError(404, 'page does not exist'));
});



app.use(cors);



app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
  next();
});



module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
