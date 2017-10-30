'use strict';
const fs = require('fs-extra');

class Storage {

  constructor(db) {

    this.dataFile = db;

    fs.pathExists(this.dataFile)
    .then( exists => ! exists && fs.outputJson(this.dataFile, {}));

  }

  getAllNotes() {

    return fs.readJson(this.dataFile);

  }

  saveNote(note) {

    return new Promise ((resolve, reject) => {

      this.getAllNotes()
      .then(data => {
        data[note.id] = note;
        fs.outputFile(this.dataFile, JSON.stringify(data))
        .then(resolve(note))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }


  deleteItem(id) {

    return new Promise((resolve, reject) => {

      this.getAllNotes()
      .then(note => {
        if(note[id]) {
          delete note[id];
          fs.outputFile(this.dataFile, JSON.stringify(note))
          .then(resolve())
          .catch(err => reject(err));
        }
      });
    });
  }
}

module.exports = (db) => { return new Storage(db); };
