'use strict';


module.exports = (err, req, res) => {
  console.log ('error', err);

  if (err.status) {
    return res.sendStatus (err.status);
  }

  return res.sendStatus (500);
};
