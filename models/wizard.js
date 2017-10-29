'use strict';

const mongoose = require('mongoose');

const wizardSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  weapon: {type: String, default: 'staff'},
  enemy: {type: String, default: 'Tyler aka Toasty'}, 
});

const Wizard = module.exports = mongoose.model('Wizard', wizardSchema); 

