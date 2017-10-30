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

  describe('POST request', () => {
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
        .catch(res => expect(res.status).toBe(400));
    });
  });

  describe('GET request', () => {
    test('should return the Wizard if the ID exists', () => {
      let testWizard = new Wizard({name: 'Severus Snape'}).save()
        .then((wizard) => {
          return request.get(url + '/' + wizard.id)
            .then(res => {
              expect(res.status).toBe(200);
              expect(res.body.name).toBe('Severus Snape');
            });
        });
    });
    test('should return status 404 if ID given does not exsit', () => {
      return request.get(url + '/' + '59f66055aedd7c6ca9934469')
        .catch(res => expect(res.status).toBe(404));
    });
  });
  
  describe('PUT request', () => {
    test('should return 400 if a wizard name is not given', () => {
      let testWizard = new Wizard({name: 'Lord Voldemort'}).save()
        .then(wizard => {
          return request.put(url + '/' + wizard.id)
            .send({cool:'beans'})
            .catch(res => expect(res.status).toBe(400));
        });
    });
    test('should return 404 if wizard ID does not exist', () => {
      return request.put(url + '/' + '59f66055aedd7c6ca9934469')
        .send(mrDolf)
        .catch(res => expect(res.status).toBe(404));
    });
    test('should retur 200 and new Wizard name if correct ID and Name are given', () => {
      let wizard = new Wizard({name: 'Mr Filch'}).save()
        .then(wizard => {
          return request.put(url + '/' + wizard.id)
            .send({name:'Dumbledorez'})
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });
  });


});
