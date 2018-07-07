'use strict';

const uuid = require('uuid');

const Storage = {};

Storage.notes = [];

Storage.createNote = (data) => {
    if (data = '' || typeof data === 'undefined') return 'Invalid Data';
    Storage.notes[uuid()] = {content: data};
    return 'Note Created';
};

Storage.updateNote = (id, content) => {
    return new Promise((resolve, reject) => {
        if (typeof Storage.notes[id] === 'undefined') reject ('Note not Found.')
        Storage.notes[`${id}`].content = content;
        resolve(`Note Updated. New body of note ${Storage.note[id]}: ${Storage.note[id].content}`);
    });
};

Storage.fetchNote = (id) => {
    return new Promise((resolve, reject) => {
        if (typeof Storage.notes[id] === 'undefined') reject('Note Not Found');
    });
    resolve(Storagenotes[id]);
};

Storage.fetchIds = () => {
    return ` ID List: ${Object.keys(Storage.notes)}`;
};
module.exports = Storage;
