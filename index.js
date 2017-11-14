'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/12Lab', {useMongoClient: true});
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(require(__dirname + '/route/sushiRouter.js'));

app.use( (req,res,next) => {
  res.append('Access-Control-Allow-Origin', '*');
  next();
});

app.use((err,req,res,next) => {
  res.send({statusCode:500, message: err});
  next();
});

app.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));
