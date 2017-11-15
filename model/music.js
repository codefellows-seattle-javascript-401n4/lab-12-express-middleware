'use strict';



const mongoose = require ('mongoose');
const musicSchema = mongoose.Schema.create ({
  name : {type : String, required: true},
  genre : {type : String},
});



const Music = module.exports = mongoose.model ('music', musicSchema);
