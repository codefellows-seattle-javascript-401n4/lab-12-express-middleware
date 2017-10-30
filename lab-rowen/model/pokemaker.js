
'use strict';

const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
  pokemon: {type: String, required: true, unique: true},
  item: {type: String, default: 'none'},
  ability: {type: String, default: 'ability'}
  moveset: {type: String, default: 'tackle, tail whip'},
});

const Pokemon = module.exports = mongoose.model('Pokemon', pokeSchema); 
