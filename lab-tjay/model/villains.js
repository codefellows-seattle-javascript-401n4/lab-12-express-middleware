'use strict';

const mongoose = require('mongoose');

const villainSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  traits: {type:String, required: true},
  logged: {type:Date, default: Date.now},
});

module.exports = mongoose.model('villain', villainSchema);
