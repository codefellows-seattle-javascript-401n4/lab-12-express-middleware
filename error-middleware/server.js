'use strict';

const app = require('express')();

app.get('/success', (req, res, next) => {
  res.send('Successful Get Request');
  next();
});

app.get('/error', (req, res, next) => {
  return next('Server Error');
  res.send('Should Not See This');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Error Caught');
});

app.listen(3000);
