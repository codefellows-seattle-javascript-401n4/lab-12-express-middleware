'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Villain = require('../model/villains.js');

const villainRouter = module.exports = new Router();

villainRouter.post('/api/villains', jsonParser, (req, res, next) => {
  console.log('POST /api/villains');
  new Villain(req.body)
    .save()
    .then(note => res.json(note))
    .catch(next);
});

villainRouter.get('/api/villains/:id', (req, res, next) => {
  console.log('GET /api/villains/:id');
  Villain.findById(req.params.id)
    .then(villain => res.json(villain))
    .catch(next);
});

villainRouter.put('/api/villains/:id', jsonParser, (req, res, next) => {
  console.log('POST /api/villains/:id');
  let options = {
    runValidators: true,
    new: true,
  };
  Villain.findByIdAndUpdate(req.params.id, req.body, options)
    .then(villain => res.json(villain))
    .catch(next);
});

villainRouter.delete('/api/villains/:id', (req, res, next) => {
  console.log('DELETE /api/villains/:id');
  Villain.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
