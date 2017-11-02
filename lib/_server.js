'use strict';

const express = require ('express');
const bodyparser = require ('body-parser').json();
const send = require ('./response');
const Note = require ('../model/note');
const notes = _dirname + '/../model/notes.json';
const store = require ('./storage');
const url = require ('./url-parser');
const createError = require ('http-errors');
const errorhandler = require ('./error-middleware');

const app = express ();


app.use ((req, res, next) => {
  url.parse (req);
  next ();
});


app.use ((req, res, next) => {
  res.append ('access');
  next ();
});


app.get ('/api/notes', (req, res, next) => {
  let id = req.url.query.id;
  if (id) {

    //fetchNote
    Note.fetchNote (id)
    .then (note => send.json (res, 200, note))
    .catch (() => next (createError (404, 'error id')));

  } else {

    //fetchIDs
    Note.fetchIDs ()
    .then (ids => send.json (res, 200, ids))
    .catch (() => next (createError (500, 'error server')));
}});


app.post ('/api/notes', bodyparser, (req, res, next) => {
  if (! req.body.title) next (createError (400, 'error title'));
  if (! req.body.content) next (createError (400, 'error content'));

  let note = new Note (req.body);
  store.saveNote (note)
  .then (note => send.json (res, 200, note))
  .catch (() => next (createError (500, 'error server')));
});


app.put ('/api/notes', bodyparser, (req, res, next) => {
  if (! req.body.title) next (createError (400, 'error title'));
  if (! req.body.content) next (createError (400, 'error content'));

  let id = req.url.query.id;

  if (id) {

    //update
    Note.updateNote (id, req.body)
    .then (note => send.json (res, 200, note))
    .catch (() => next (createError (400, 'error id')));
  }

  else next (createError (400, 'error id'));
});


app.delete ('/api/notes', function (req, res, next) {
  let id = req.url.query.id;

  if (id) {

    store.deleteItem (id)
    .then (send.json (res, 204))
    .catch (next (createError (500, 'error server')));

  } else {
    next (createError (400, 'error id'));
  });

  app.all ('$', (req, res, next) => {
    next (createError (404, 'error'));
  });

  app.use (errorhandler);

  module.exports = {
    start : (port, cb) => {
      app.listen (port, cb);
      console.log ('server on ${process.env.PORT}');
    }
    stop : (cb) => app.close (cb),
  }};
