/*global beforeAll, expect*/

const route = require('./route');
const storageManger = require('../lib/storage');
const ToDo = require('./model.js');


storageManger.loadAll(ToDo);

//mocks
let Res = function(){};

Res.prototype.status = function(status) {
  this.code = status;
  return this;
};

Res.prototype.send = function(body) {
  this.body = body;
  return this;
};

let res = new Res();

let next = function(error){
  return error;
};

describe('To Do routes', () => {
  beforeAll(() => {
    storageManger.loadAll(ToDo);
  });
  describe('get', () => {
    test('gets all the todos if no id passed', () => {
      let req = {};
      req.query = {};
      req.body = {};
      let test = route.get(req, res, next);
      expect(test.code).toEqual(200);
      expect(test.body).toEqual({});
    });

    test('throws an 404 if the todo is not found', () => {
      let req = {};
      req.query = {};
      req.body = {};
      req.query.id = 'id';
      let returned = route.get(req, res, next);

      expect(returned.status).toEqual(404);
    });
  });

  describe('post', () => {
    test('returns 200 if body sent', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.body.task = 'do something else';
      let test = route.post(req, res, next);

      expect(test.code).toEqual(200);

    });

    test('returns 400 if no task', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.body.task = null;
      let returned = route.post(req, res, next);

      expect(returned.status).toEqual(400);
    });
  });

  describe('delete', () => {

    test('throws an 404 if the todo is not found', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.query.id = 'id';
      let returned = route.delete(req, res, next);

      expect(returned.status).toEqual(404);
    });
  });
});
