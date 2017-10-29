/* globals expect afterAll beforeAll */
'use strict';

const request = require('superagent');
const mongoose = require('mongoose');
const Wizard = require(__dirname + '/../models/wizard.js');

process.env.TEST_DB = 'mongodb://localhost:27017/wizards_test';
const wizardRouter = require(__dirname + '/../routes/wizard-router.js');
const server = require(__dirname + '/../lib/server.js');
server.listen(3000);

// helper stuff 
const url = 'http://localhost:3000/api/v1/wizards';
const mrDolf = {
  name: 'Gandalf',
  weapon: 'staff',
  enemy: 'Sauron',
};

describe('testing wizard router', () => {
  beforeAll( () => {
    return Wizard.remove({});
  });
  afterAll(() => {
    server.close();
  });

  describe('put request', () => {
    test('it should respond with 200 and a new wizard in the body', () => {
      return request.post(url)
        .send(mrDolf)
        .then(res => {
          expect(res.status).toBe(200);
          expect(res.body.name).toBe(mrDolf.name);
        });
    });
    test('should receive a 400 status if no wizard name is given', () => {
      return request.post(url)
        .catch(res => {
          expect(res.status).toBe(400);
        });
    });
  });
  
});
