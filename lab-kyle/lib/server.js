'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const router = express.Router();
const app = module.exports = express();

const bodyParser = require('body-parser').json();
const cors = require('./middleware/cors');
const errorMiddleware = require('./middleware/error-middleware');

require('../routes/doggo-routes')(router);

app.use(bodyParser);
app.use(cors);
app.use(router);
app.use(errorMiddleware);

app.all('/*', (req, res) => res.sendStatus(404));

module.exports = app;
