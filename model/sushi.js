'use strict';

const mongoose = require('mongoose');

const sushiSchema = new mongoose.Schema({
  name: {type: String, required: true},
  fish: {type: String},
  price: {type: Number},
});

module.exports = mongoose.model('sushi', sushiSchema);
