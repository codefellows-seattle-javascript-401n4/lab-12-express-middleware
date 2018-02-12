'use strict';

const uuid = require('uuid/v4');

module.exports = function(name, breed){
  this.name = name;
  this.breed = breed;
  this._id = uuid();
};
