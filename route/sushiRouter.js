'use strict';

const sushiRouter = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();
const Sushi = require('../model/sushi.js');

sushiRouter.post('/sushi', bodyParser, (req,res,next) => {
  new Sushi(req.body).save()
  .then( sushi => {
    if(!req.body.contents){
      res.send({statusCode:400, message: 'error creating sushi'});
    }
    res.send({statusCode:200, message:sushi});
  })
  .catch(err => next(err));
});

sushiRouter.get('/sushi', (req,res,next) => {
  Sushi.find({})
  .then( data => {
    if(!data){
      res.send({statusCode:404, message: 'no sushi found'});
    }
    res.send({statusCode:200, message:data});
  })
  .catch(err => next(err));
});

sushiRouter.get('/sushi/:id', (req,res,next) => {
  Sushi.findOne({_id: req.params.id})
  .then( id => {
    if(!id){
      res.send({statusCode:400, message: 'no id provided or found'});
    }
    res.send({statusCode:200, message:id});
  })
  .catch(err => next(err));
});

sushiRouter.put('/sushi/:id', bodyParser, (req,res,next) => {
  Sushi.findOneAndUpdate({_id: req.params.id}, req.body)
  .then( sushi => {
    if(!sushi.name){
      res.send({statusCode:400, message: 'no name provided'});
    }
    res.send({statusCode:200, message:sushi});
  })
  .catch(err => next(err));
});
