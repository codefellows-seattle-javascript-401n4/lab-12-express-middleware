'use strict';

const express = require('express');
const app = express();

// Just setting up some place holder/ reminders.

app.get('/', (req, res, next) => {
  res.send('Hello from middleware')
}, (req,res) => {
  res.send('Hello World! Oh I mean, Hello from server');
});

app.post('/', (req,res) => {
  res.send('POST request');
});

app.put('/user', (req,res) => {
  res.send('got a PUT request at /user');
});

app.listen(process.env.PORT || 3000);
