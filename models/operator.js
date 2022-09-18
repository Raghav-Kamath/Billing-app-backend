const mongoose = require('mongoose')

const Operator = new mongoose.Schema({
  name: String,
  id: {type:Number,unique:true},
  password: String,
  storeType: String,
  storeName: String,
  location: String
});

Operator.statics.sendData=function (id){
  return this.model('Operator').findOne({id:id},{password:0,_id:0,__v:0})
}

const operatorModel = mongoose.model('Operator', Operator);

module.exports = operatorModel


