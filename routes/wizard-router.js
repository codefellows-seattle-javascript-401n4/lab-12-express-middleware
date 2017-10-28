'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Wizard = require(__dirname + '/../models/wizard.js');

const wizardRouter = module.exports = express.Router();

wizardRouter.get('/wizards', (req, res, next) => {
  Wizard.find({})
    .then(res.send.bind(res))
    .catch(err => next({error: err}));
});

