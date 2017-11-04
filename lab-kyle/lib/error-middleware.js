'use strict';

const express = require('express');
const app =  express();

app.get('/success', (req, res, next) => {
  res.send('successful GET');
  next();
});

app.get('/error', (req, res, next) => {
  return next(new Error('server error!'));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send('error caught');
  next();
});

app.listen(process.env.PORT || 3000);
