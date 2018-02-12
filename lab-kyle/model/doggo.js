'use strict';

const debug = require('debug')('http:model-doggo');

const uuid = require('uuid/v4');

module.exports = function(name, breed){
  debug(`model-doggo: ${name} created`);
  this.name = name;
  this.breed = breed;
  this._id = uuid();
};
