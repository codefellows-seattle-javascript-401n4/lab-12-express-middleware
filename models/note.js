'use strict';

const uuid = require('uuid/v1');

const notes = __dirname + '/../models/notes.json';
const storage = require('../lib/storage')(notes);


class Note {
    
  constructor(config) { 
    this.id = uuid();
    this.title = config.title;
    this.content = config.content;
    this.createdOn = new Date();
  } 

  static fetchNote(id) {
    
    return new Promise ((resolve, reject) => {

      storage.getItems()
        .then(note => {
          if(note[id]) resolve(note[id]);
          else reject(); })
        .catch(err => reject(err));

    });
  }
  static updateNote(id, _note) {
    
    return new Promise ((resolve, reject) => {

      this.fetchNote(id)
        .then(note => {
          note.content = _note.content;
          note.title = _note.title;
          resolve(note);
        })
        .catch(err => reject(err));
    });
  }

}
module.exports = Note;