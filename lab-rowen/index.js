'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = require(__dirname + '/lib/server.js');

app.listen(PORT, () => console.log(`server is up, kupo!: ${PORT}`));