'use strict';

const uuid = require ('uuid/v1');
const notes = _dirname + '/../model/notes.js';
const store = require ('../lib/storage') (notes);

class Note {

  constructor (data) {

    this.id = uuid ();
    this.title = data.title;
    this.content = data.content;
    this.date = Date.now ();
  }

  static updateNote (id, body) {
    return new Promise ((resolve, reject) => {

      this.fetchNote (id)
      .then (note => {
        let noteTwo = note;
        noteTwo.content = body.content;
        noteTwo.title = body.title;
        store.deleteItem (id);
        store.saveNote (note2);
        resolve (note2);
      })
      .catch (err => reject (err));
    });
  }

  static fetchNote (id) {
    return new Promise ((resolve, reject) => {

      store.getAllNotes ()
      .then (note => {
        if (note (id)) resolve (note (id));
        else reject ();
        .catch (err => reject (err));
      });
    });

    static fetchIDs (id) {
      return new Promise ((resolve, reject) => {

        store.getAllNotes () {
          .then (allNotes => {
            let ids = ();
            for (var key in allNotes) {
              if (allNotes.hasOwnProperty (key))
              ids.push (allNotes (key).id);
            }
            resolve (id);
          })
          .catch (err => { reject (err) });
        }
      })
    }
  }
}
});

module.exports = Note;
