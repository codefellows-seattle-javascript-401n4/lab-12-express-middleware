'use strict';

const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('from .use middleware');
  next();
});

app.get('/', (req, res, next) => {
  console.log('from .get middleware');
  next();
}, (req, res, next) => {
  console.log('Hello World! Oh I mean, Hello from final middleware');
  res.send('Hello World! Oh I mean, Hello from final middleware');
  next();
});

app.use((req, res, next)  => {
  console.log('from .use after routes middleware');
  next();
});

app.listen(process.env.PORT || 3000);
