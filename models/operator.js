const mongoose = require('mongoose')

const Operator = new mongoose.Schema({
  name: String,
  id: Number,
  password: String,
  storeType: String,
  storeName: String,
  location: String
});

const operatorModel = mongoose.model('Operator', Operator);

module.exports = operatorModel


