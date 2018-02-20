'use strict';

const debug = require('debug')('http:server');

const express = require('express');
const router = express.Router();
const app = express();

const bodyParser = require('body-parser').json();
const cors = require('./middleware/cors');
const errorMiddleware = require('./middleware/error-middleware');

require('../routes/doggo-routes')(router);

app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware);

module.exports = app;
