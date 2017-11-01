'use strict';

const ToDo = require('./model.js');
const ServerError = require('../lib/error');
const storage = require('../lib/storage');

let routes = module.exports = {};

routes.post = ((req, res, next) => {
  if (!req.body.task) {
    let error = new ServerError(400, 'need a task to do');
    return next(error);
  }
  let newpost = new ToDo(req.body);
  newpost.addToDo();
  return res.status(200).send(`success ${JSON.stringify(newpost)}`);
});

routes.sendAll = ((req, res, next) => {
  let sendBody = ToDo.allToDos;
  if (sendBody) {
    return res.status(200).send(sendBody);
  }
  let error = new ServerError(404, 'good god something has gone really wrong');
  return next(error);
});

routes.get = ((req, res, next) => {
  if (req.query) {
    if (req.query.id) {
      if (ToDo.allToDos[req.query.id]) {
        return res.status(200).send(ToDo.allToDos[req.query.id]);
      }
      let error = new ServerError(404, 'that id does not match an item');
      return next(error);
    }
    if (req.query.allIDs) {
      let allIds = storage.availIDs(ToDo.allToDos);
      return res.status(200).send(allIds);
    }
  }
  return routes.sendAll(req, res, next);
});


routes.delete = ((req, res, next) => {
  if (req.query.id) {
    let id = req.query.id;
    let todo = ToDo.allToDos[id];
    if (todo) {
      let toDelete = new ToDo(Object.assign({}, todo));
      toDelete.deleteToDo().then(() => {
        return res.status(200).send('deleted!');
      });
    } else {
      let error = new ServerError(404, 'not found');
      return next(error);
    }
  }
});
