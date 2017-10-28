'use strict';

const mongoose = require('mongoose');

const wizardSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  weapon: {type: String, default: 'staff'},
  enemy: {type: String, required: true}, 
});


const Wizard = module.exports = mongoose.model('Wizard', wizardSchema); 


// http :5000/api/v1/wizards
// echo '{"name":"gandalf","weapon":"staff","enemy":"sauron"}' | http POST :5000/api/v1/wizards