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
  let desiredWizard = req.params.id;
  Wizard.findOne({_id: desiredWizard})
    .then(res.send.bind(res))
    .catch(err => next({error: err}));
}); 

wizardRouter.post('/wizards', jsonParser, (req, res, next) => {
  let newWizard = new Wizard(req.body);
  newWizard.save()
    .then(res.send.bind(res))
    .catch(err => next({error:err}));
});

wizardRouter.put('/wizards/:id', jsonParser, (req,res, next) => {
  Wizard.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(res.send('PUT request success'))
    .catch(err => next({error: err}));
});


// http :5000/api/v1/wizards
// echo '{"name":"gandalf","weapon":"staff","enemy":"sauron"}' | http POST :5000/api/v1/wizards