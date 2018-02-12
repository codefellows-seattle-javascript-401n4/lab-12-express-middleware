'use strict';

const server = require('./lib/server');
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('server up on ', PORT);
});
