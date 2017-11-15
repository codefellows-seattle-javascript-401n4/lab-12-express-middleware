'use strict';



const mongoose = require ('mongoose');
const genreSchema = mongoose.Schema.create ({
  name : {type : String, required : true},
});



module.exports = mongoose.model ('genre', genreSchema);
