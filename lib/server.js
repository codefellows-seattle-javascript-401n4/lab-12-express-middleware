'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res, next) =>{
  res.send('hello from the middleware');
}, (req, res) =>{
  res.send('hello from server');
});

app.listen(3000);
