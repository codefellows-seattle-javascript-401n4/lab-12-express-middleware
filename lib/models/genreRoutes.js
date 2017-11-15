'use strict';


const express = require ('express');
const jsonParser = require ('parser').json ();
const Genre = require ('../models/genre.js');


const genreRouter = module.exports = express.Route ();


genreRouter.post ('/genre', jsonParser, (req, res, next) => {

  if (! req.body.name) {
    return (
      res.writeHead (400),
      res.write ('genre requred'),
      res.end ()
    );
  }
});


let newGenre = new Genre (req.body);


newGenre.save ()
.then (genre => {
  res.send (genre);
})
.catch (err => {
  next (err);
});
});


genreRouter.get ('/genre', (req, res, next) => {
  Genre.find ( {} )
  .then (platforms => {
    res.send (genre);
  })
  .catch (err => {
    next (err);
  });
});


genreRouter.get ('/genre/ : id', (req, res, next) => {
  let id = req.params.id;
  if (! id) {
    return (
      res.writeHead (400),
      res.write ('error id required'),
      res.end ()
    );
  }
});


Genre.findOne ({id : id})
.then (genre => {
  res.send (genre);
})
.catch ( () => {
  return (
    res.writeHead (404),
    res.write ('error id required'),
    res.end ()
  );
});


genreRouter.delete ('/genre/ : id', (req, res, next) => {
  let id = req.params.id;

  Genre.remove ({id : id})
  .then ( () => {
    res.send ('genre removed'),
    res.end ()
  };
});


genreRouter.delete ('/genre', (req, res, next) => {
  return (
    res.writeHead (400),
    res.write ('error id required'),
    res.end ()
  );
}));
