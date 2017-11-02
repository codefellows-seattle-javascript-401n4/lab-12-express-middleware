'use strict';

const mongoose = require ('mongoose')

const noteSchema = mongoose.Schema ({
  title : {type : string, required : true},
  content : {type : string, required : true},
});

const Note = module.exports = mongoose.model ('note', noteSchema)
