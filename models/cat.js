'use strict';

const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  birthday: {type: Date, default: Date.now},
  favoriteDrug: {type: String, default: 'cat nip'},
  favoriteFood: {type: String, default: 'meow mix'},

});
const Cat = module.exports = mongoose.model('cats', catSchema);
