'use strict';

const createError = require('http-errors');

module.exports = function(err, req, res, next){
  if(err.status){
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
