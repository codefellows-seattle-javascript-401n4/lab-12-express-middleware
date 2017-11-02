'use strict';

const fse = require ('fs-extra');
//installed fs-extra for assistance

class Storage {
  constructor (db) {
    this.dataFile = db;

    fse.pathsExists (this.dataFile)
    .then (exists => ! exists && fse.outputJson (this.dataFile, {}));
  }
  getAllNotes () {
    return fse.readJson (this.dataFile);
  }
  saveNote (note) {
    return new Promise ((resolve, reject) => {
      this.getAllNotes ()
      .then (data => {
        data (note.id) = note;
        fse.outputFile (this.dataFile, JSON.stringify (data))
        .then (resolve (note))
        .catch (err => reject (err));
      });

      deleteItem (id) {
        return new Promise ((resolve, reject) => {
          this.getAllNotes ()
          .then (note => {
            if (note (id));
            fse.outputFile (this.dataFile, JSON.stringify (note))
            .then (resolve())
            .catch (err => reject (err));
          });
        })
      }
    })
  }
}

module.exports = (db) => {
  return new Storage (db);
};
