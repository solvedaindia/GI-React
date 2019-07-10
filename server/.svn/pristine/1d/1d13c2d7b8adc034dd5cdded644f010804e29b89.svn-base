const mongoose = require('mongoose');
// const dbURI = 'mongodb://192.168.0.84:27017/solveda_ecommerce';
const localURI = 'mongodb://localhost:27017/solveda_ecommerce';

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
};
mongoose.connect(
  localURI, options).then(
  () => {
    console.log('Database connection established!');
  },
  err => {
    console.log('Error connecting Database instance due to: ', err);
  }
);
require('../models/user')
