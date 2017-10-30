'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.TEST_DB || 'mongodb://localhost:27017/wizards', {useMongoClient: true});

const app  = module.exports = require('express')();

app.use('/api/v1', require(__dirname + '/../routes/wizard-router.js'));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

app.use((err, req, res, next) => {
  console.log(err.error);
  res.status(err.statusCode || 500).send(err.message || 'server error');
});

