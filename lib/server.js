'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) =>{
  console.log('hi');
  res.send('hellow world');
});
app.listen(3000);
