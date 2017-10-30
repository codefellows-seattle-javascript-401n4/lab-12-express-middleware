'use strict';

const errorhandler = (err, req, res, next) => {

  res.status(err.status).send(err.message);
  next();

};

module.exports = errorhandler;
