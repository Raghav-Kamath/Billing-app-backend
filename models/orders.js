const mongoose=require('mongoose')

const Orders = new mongoose.Schema({
  orderId: {type:String,unique:true},
  customerName: String,
  customerNumber: Number,
  customerEmail: String,
  modeofCommunication:String,
  homeDelivery:Boolean,
  operatorId: {type:Number},
  products: [{productId:Number,quantity:Number}],
  total: Number,
  offlinePayment:{type:Boolean,default:false},
  razorpayLink: String,
  razorpaymentID:String,
  createdAt:{type:Date,default:Date.now()}
});

const ordersModel = mongoose.model('Orders', Orders);

module.exports = ordersModel


