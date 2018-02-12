'use strict';

const debug = require('debug')('http:storage');

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const Doggo = require('../model/doggo');

const storage = module.exports = {};

storage.create = function(item){
  debug('#create');
  return new Promise((resolve, reject) => {
    if(!item.name) return reject(createError(400, 'cannot create; name required'));
    if(!item.breed) return reject(createError(400, 'cannot create; breed required'));

    let doggo = new Doggo(item.name, item.breed);

    return fs.writeFileProm(`${__dirname}/../data/doggo/${doggo._id}.json`, JSON.stringify(doggo))
      .then(() => resolve(doggo))
      .catch(reject);
  });
};

storage.fetchOne = function(itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!itemId) return reject(createError(400, 'cannot get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/doggo/${itemId}.json`)
      .then(buff => {
        try {
          let doggo = JSON.parse(buff.toString());
          return resolve(doggo);
        } catch(e) {
          return reject(e);
        }
      })
      .catch(reject);
  });
};

storage.fetchAll = function(schema){
  debug('#fetchAll');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError('cannot get doggos; schema required'));

    return fs.readdirProm(`${__dirname}/../data/${schema}`)
      .then(ids => {
        let data = Array.prototype.map.call(ids, (id => id.split('.', 1).toString()));
        return resolve(data);
      })
      .catch(reject);
  });
};

storage.update = function(schema, item, itemId) {
  debug('#update');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError(400, 'cannot update; schema required'));
    if(!item) return reject(createError(400, 'cannot update; item required'));
    item._id = itemId;
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${itemId}.json`, JSON.stringify(item))
      .then(resolve)
      .catch(reject);
  });
};

storage.destroy = function(schema, itemId) {
  debug('#destroy');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(createError(400, 'cannot delete item; schema required'));
    if(!itemId) return reject(createError(400, 'cannot delete item; itemId required'));

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(resolve)
      .catch(reject);
  });
};
