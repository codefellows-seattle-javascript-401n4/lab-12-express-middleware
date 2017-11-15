'use strict';


const express = require ('express');
var mongoose = require ('mongoose');


let app = express ();
mongoose.Promise = Promise;
mongoose.connect ('mongodb://localhost:27017/expressmongo');


app.use ((req, res, next) => {
  res.append ('access granted', ' * ');
  next ();
});


app.use (require (' ./ '));

let isActive = false;


module.exports = {
  start : () => {
    return new Promise ((resolve, reject) => {
      if (!isActive) {

        app.listen (3000, err => {
          if (err) {
            reject (err);

          } else {

            isActive = true;
            resolve (console.log ('server is active'));
          }
        });

      } else {

        app.close (err => {
          if (err) {
            reject (err);

          } else {

            app.close (err => {
              if (err) {
                reject (err);

              } else {

                isActive = false;
                resolve (console.log ('server is inactive'));
              }
            }
          );
        }});
      }});
    }};
