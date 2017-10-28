'use strict';

const uuid = require('uuid/v1');

class Note {

  constructor(data) {

    this.id = uuid();
    this.title = data.title,
    this.content = data.content;
    this.date = Date.now();

  }

  updateNote(data) {

  }

  fetchNote(id) {

  }

  fetchIDs() {

  }
  
}

module.exports = Note;
