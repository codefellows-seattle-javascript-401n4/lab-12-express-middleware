'use strict';

const mocha = require('mocha');
const superagent = require('superagent');
const expect = require('expect');
const Sushi = require('../model/sushi.js');
const mongoose = require('mongoose');
const server = require('../index.js');
const dotenv = require('dotenv').config();
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/18Lab', {useMongoClient: true});


describe('post test', () => {
  it('should return the sushi object that was created and a 200', () => {
    return superagent.post('http://localhost:3000/sushi')
    .send({
      name: 'spider',
      fish: 'crab',
      price: 8,
    })
    .then( res => {
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual('spider');
      expect(res.body.price).toBe(8);
      expect(res.body.fish).toBe('crab');
    });
  });
  it('should return a 400 for a missing name', () => {
    return superagent.post('http://localhost:3000/sushi')
    .send({
      fish: 'crab',
      price: 8,
    })
    .catch( res => {
      expect(res.status).toEqual(400);
    });
  });
});

describe('get test', () => {
  it('should return a 200 for a get request and show all of the databased users', () => {
    return superagent.get('http://localhost:3000/sushi')
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('should return a 200 and the specific user associated with the inputted id', () => {
    return superagent.get('http://localhost:3000/sushi/5a0b582e9d977dc3aa3c9085')
    .then( res => {
      expect(res.status).toBe(200);
      expect(res.body._id).toBe('5a0b582e9d977dc3aa3c9085');
    });
  });
  it('should return a 400 for an invalid id', () => {
    return superagent.get('http://localhost:3000/sushi/8888')
    .catch( res => {
      expect(res.status).not.toBe(400);
      expect(res.body._id).not.toBe('5a0b582e9d977dc3aa3c9085');
    });
  });
});

describe('put test', () => {
  it('should return a 200 for an updated name', () => {
    return superagent.put('http://localhost:3000/sushi/5a0b582e9d977dc3aa3c9085')
    .send({
      name: 'tasty tasty',
      fish: 'tuna',
      price: 6,
    })
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('tasty tasty');
    });
  });
  it('should return a 400 to a request to an invalid id', () => {
    return superagent.put('http://localhost:3000/sushi/5a0b582e9d977dc3')
    .send({
      name: 'tasty tasty',
      fish: 'tuna',
      price: 6,
    })
    .catch(res => {
      expect(res.status).toBe(400);
    });
  });
  it('should return a 400 to a request with no name', () => {
    return superagent.put('http://localhost:3000/sushi/5a0b582e9d977dc3aa3c9085')
    .send({
      fish: 'tuna',
      price: 6,
    })
    .catch(res => {
      expect(res.status).toBe(400);
    });
  });
});
