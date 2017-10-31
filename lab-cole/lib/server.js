'use strict';

const mongoose = require ('mongoose'); //still need to install mongoose
mongoose.Promise = require('bluebird'); //still need to install bluebird or whatever that is...
mongoose.connect('mongodb://localhost:27017/notes', {useMongoClient: true}); //process.env.DB_URL, need to figure out what this is

const app = module.exports = require('express')();

app.use('/api/v1', require(__dirname + '/routes/routes.js'));

app.use((err, req, res, next) => {
    console.log(err.error);
    res.status(err.statusCode || 500).send(err.message || 'server error');
});