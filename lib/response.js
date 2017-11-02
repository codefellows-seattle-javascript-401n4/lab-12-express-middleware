'use strict';

module.exports = {
  JSON : (res, data, status) => {

    res.writeHead (status, {'type' : 'application/json'});
    res.end (JSON.stringify (data));
}
}
  status : (res, status, msg) => {

    res.writeHead (status);
    res.write (msg);
    res.end ();
  }};
 
