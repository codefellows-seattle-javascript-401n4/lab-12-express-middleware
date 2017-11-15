'use strict';



const express = require ('express');
const jsonParser = require ('parser.js').json ();
const Music = require ('../models/music.js');


const musicRouter = module.exports = express.Router ();


musicRouter.post ('/music', jsonParser, (req, res, next) => {
  if (! req.body.name || ! req.body.genre) {
    return (
      res.writeHead (400),
      res.write ('error missing genre'),
      res.end ()
    );
  }

  let newMusic = new Music (req.body);
  newMusic.save ()
  .then (game => {
    res.send (game);
  })
  .catch (err => {
    next (err);
  });
});


musicRouter.get ('/music' (req, res, next) => {
  Music.find ({})
  .then (music => {
    res.send (music);
  })
  .catch (err => {
    next (err);
  });
});


musicRouter.get ('/music/ : id', (req, res, next) => {
  let id = req.params.id;
  if (! id) {
    return (
      res.writeHead (400),
      res.write ('id required'),
      res.end ()
    )
  }


  Music.findOne ({id : id})
  .then (music => {
    res.send (music);
  })
  .catch ( () => {
    return (
      res.writeHead (404),
      res.write ('error missing id'),
      res.end ()
    )
  };
});


musicRouter.delete ('/music/ : id', (req, res, next) => {
  let id = req.params.id;

  Music.remove ({id : id})
  .then ( () => {
    res.send ('music has been removed');
  })
  .catch ( () => {
    return (
      res.writeHead (404),
      res.write ('error missing music'),
      res.end ()
    )
  });
}));
