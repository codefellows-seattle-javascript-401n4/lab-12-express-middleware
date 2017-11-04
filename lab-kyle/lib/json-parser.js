'use strict';

const express = require(express);
const app = express();

app.use((req, res, next) => {
  let text = '';
  req.on('data', data => text += data.toString());
  req.on('end', () => {
    try {
      req.text = text;
      if(req.headers['content-type'] === 'application/json'){
        req.body =JSON.parse(text);
      }
    } catch(err) {
      next({statusCode: 422, message: 'invalid JSON', error: err});
    }
    next();
  });
});

app.post('/parse', (req, res) => {
  res.send(req.body);
});

app.use((err, req, res, next) => {
  console.log(err.error);
  res.status(err.statusCode || 500).send(err.message);
  next();
});

app.listen(3000);
