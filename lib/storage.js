'use strict';
let fs = require('fs-extra');
const db = './data/toDos.json';

let storageManger = {};
module.exports = storageManger;

storageManger.loadAll = function(storageObj){
  storageObj['allToDos'] = {};
  return new Promise(function(resolve, reject) {
    fs.readJson(db)
      .then(packageObj => {
        storageObj['allToDos'] = packageObj;
        resolve(packageObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

storageManger.availIDs = function(storageObj){
  let allIDs = Object.keys(storageObj).map(key => {
    return key;
  });
  return allIDs;
};
