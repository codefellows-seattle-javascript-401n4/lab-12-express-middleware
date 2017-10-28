'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Wizard = require(__dirname + '/../models/wizard.js');

const wizardRouter = module.exports = express.Router();

// get all wizards from database
wizardRouter.get('/wizards', (req, res, next) => {
  Wizard.find({})
    .then(res.send.bind(res))
    .catch(err => next({error: err}));
});

// get a specific wizard from database
wizardRouter.get('/wizards/:id', (req, res, next) => {
  Wizard.findOne({_id: req.params.id})
    .then(res.send.bind(res))
    .catch(err => next({error: err}));
}); 

// save a new wizard to database
wizardRouter.post('/wizards', jsonParser, (req, res, next) => {
  let newWizard = new Wizard(req.body);
  newWizard.save()
    .then(res.send.bind(res))
    .catch(err => next({error:err}));
});

// update a specific wizard 
wizardRouter.put('/wizards/:id', jsonParser, (req,res, next) => {
  Wizard.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(res.send('PUT request success'))
    .catch(err => next({error: err}));
});

// delete a specific wizard 
wizardRouter.delete('/wizards/:id', (req, res, next) => {
  Wizard.remove({_id: req.params.id})
    .then(res.send('Wizard deleted'))
    .catch(err => next({statusCode: 500, message: 'error killing wizard', error: err}));
});