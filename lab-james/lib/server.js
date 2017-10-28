'use strict';

const express = require('express');
const app = express();

let isRunning = false;

module.exports = {
  start: (port) => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        app.listen(port, err => {
          if(err){
            reject(err);
          } else {
            isRunning = true;
            console.log('Server up');
          }
        });

      } else {

        reject(console.log('Server is already running'));

      }
    });
  },
  stop: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        reject(console.log('Server is not running'));

      } else {

        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            resolve(console.log('Server off'));
          }
        });

      }
    });
  },
};
