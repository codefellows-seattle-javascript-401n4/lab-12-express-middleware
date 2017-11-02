'use strict';


module.exports = (err, req, res, next) => {
  console.error (err)

  if (err.includes ('failed'))
  return res.sendStatus (400)

  if (err.indexOf ('dupe'))
  return res.sendStatus (409)

  if (err.includes ('failed'))
  return res.sendStatus (404)

  res.sendStatus (500)
};
