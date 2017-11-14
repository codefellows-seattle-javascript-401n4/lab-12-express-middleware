'use strict';

const sushiRouter = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const Sushi = require('../model/sushi.js');

sushiRouter.post('/sushi', bodyParser, (req,res,next) => {
  new Sushi(req.body).save()
  .then( sushi => {
    if(!req.body.name){
      res.status(400).send(err);
    }
    res.status(200).send(sushi);
  })
  .catch(err => next(err));
});

sushiRouter.get('/sushi', (req,res,next) => {
  Sushi.find({})
  .then( data => {
    if(!data){
      res.status(404).send(err);
    }
    res.status(200).send(data);
  })
  .catch(err => next(err));
});

sushiRouter.get('/sushi/:id', (req,res,next) => {
  Sushi.findOne({_id: req.params.id})
  .then( id => {
    if(!id){
      res.status(400).send(err);
    }
    res.status(200).send(id);
  })
  .catch(err => next(err));
});

sushiRouter.put('/sushi/:id', bodyParser, (req,res,next) => {
  Sushi.findOneAndUpdate({_id: req.params.id}, req.body)
  .then( sushi => {
    if(!sushi.name){
      res.status(400).send(err);
    }
    res.status(200).send(sushi);
  })
  .catch(err => next(err));
});
