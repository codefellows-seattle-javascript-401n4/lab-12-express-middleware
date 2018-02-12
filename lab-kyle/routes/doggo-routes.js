'use strict';

const debug = require('debug')('http:route-doggo');

const storage = require('../lib/storage');
const createError = require('http-errors');


module.exports = function(router){
  router.post('/api/doggo', (req, res) => {
    debug('/api/doggo POST');
    return storage.create(req.body)
      .then(doggo => res.status(201).json(doggo))
      .catch(next);
  });

  router.get('/api/doggo/:_id', (req, res, next) => {
    debug('/api/doggo/:_id GET');
    if (!req.params._id){
      err.status;
    }
    return storage.fetchOne(req.params._id)
      .then(doggo => res.json(doggo))
      .catch(next);
  });

  router.get('/api/doggo', (req, res, next) => {
    debug('/api/doggo GET');
    return storage.fetchAll('doggo')
      .then(data => res.json(data))
      .catch(next);
  });


  router.put('/api/doggo/:_id', (req, res, next) => {
    debug('/api/doggo PUT');
    return storage.update('doggo', req.body, req.params._id)
      .then(doggo => res.status(204).json(doggo))
      .catch(next);
  });

  router.delete('/api/doggo/:_id', (req, res, next) => {
    debug('/api/doggo DELETE');
    return storage.destroy('doggo', req.params._id)
      .then(() => res.status(204).json())
      .catch(err => createError(err.status, err.message), next);
  });

};
