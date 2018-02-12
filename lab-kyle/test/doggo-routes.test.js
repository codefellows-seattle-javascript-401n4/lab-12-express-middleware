'use strict';

const superagent = require('superagent');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

require('../lib/server').listen(3000);

describe('Testing doggo routes', function() {
  describe('all requests to /api/doggo', () => {
    describe('POST requests', () => {
      describe('Valid Requests', ()  => {
        beforeAll(done => {
          superagent.post(':3000/api/doggo')
            .type('application/json')
            .send({
              name: 'cindy',
              breed: 'lab',
            })
            .then(res => {
              this.mockdoggo = res.body;
              this.resPost = res;
              done();
            });
        });
        test('should create and return a new doggo, given a valid request', () => {
          expect(this.mockdoggo).toBeInstanceOf(Object);
          expect(this.mockdoggo).toHaveProperty('name');
          expect(this.mockdoggo).toHaveProperty('breed');
          expect(this.mockdoggo).toHaveProperty('_id');
        });
        test('should have a name, given a valid request', () => {
          expect(this.mockdoggo.name).toBe('cindy');
        });
        test('should have a breed, given a valid request', () => {
          expect(this.mockdoggo.breed).toBe('lab');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockdoggo).toHaveProperty('_id');
          expect(this.mockdoggo._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
        });
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
      describe('Invalid Requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/doggo')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err;
              done();
            });
        });
        test('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(400);
          expect(this.errPost.message).toBe('Bad Request');
        });
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });

    describe('GET requests', () => {
      test('should get the record from the doggo dir', done => {

        superagent.get(`:3000/api/doggo/${this.mockdoggo._id}`)
          .type('application/json')
          .then(res => {
            this.resGet = res.body;
            this.resGet.status = res.status;
            expect(this.resGet).toBeInstanceOf(Object);
            expect(this.resGet).toHaveProperty('name');
            expect(this.resGet).toHaveProperty('breed');
            expect(this.resGet).toHaveProperty('_id');
            done();
          });
      });

      test('should have a name, given a valid request', (done) => {
        expect(this.resGet.name).toBe('cindy');
        done();
      });
      test('should have a breed, given a valid request', (done) => {
        expect(this.resGet.breed).toBe('lab');
        done();
      });
      test('should have an _id, given a valid request', (done) => {
        expect(this.resGet).toHaveProperty('_id');
        expect(this.resGet._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
        done();
      });
      test('should return a 200 CREATED, given a valid request', (done) => {
        expect(this.resGet.status).toBe(200);

        done();
      });
    });


    describe('PUT requests', ()=> {
      describe('Valid requests', () => {
        test('should create a return a new doggo, given a valid request', done => {
          superagent.put(`:3000/api/doggo/${this.mockdoggo._id}`)
            .send({
              name: 'bob',
              breed: 'stuffed turtle',
            })
            .then(res => {
              this.res = res;
              expect(this.res.status).toBe(204);
              done();
            });
        });
      });
      describe('Invalid requests', () => {
        test('should return a 500 error', done => {
          superagent.put(':3000/api/doggo')
            .type('application/json')
            .send({})
            .then(res => {
              expect(res.status).toBe(204);
            })
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });

    describe('Delete requests', () => {
      describe('Valid requests', () => {
        beforeAll (done => {
          superagent.delete(`:3000/api/doggo/${this.mockdoggo._id}`)
            .then(res => {
              console.log(res);
              this.resDelete = res;
              done();
            });
        });
        test('should return a 204 No Content', done => {
          expect(this.resDelete.status).toBe(204);
          done();
        });
      });
      describe('Invalid requests', ()=> {
        test('should return 404', done => {
          superagent.delete(':3000/api/doggo')
            .query({_id: 'tabgobargblawrjg'})
            .catch(res => {
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });
  });
});
