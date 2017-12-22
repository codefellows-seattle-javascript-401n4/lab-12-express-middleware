'use strict';



module.exports = {
  status: (res, status, text) => {
    res.writeHead(status);
    res.write(text);
    res.end();
  },


  json: (res, status, data) => {
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  },
};
