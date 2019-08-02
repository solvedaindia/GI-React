// const argv = require('./argv');
require('dotenv').config();
module.exports = parseInt(process.env.CLIENT_PORT || '5000', 10);
