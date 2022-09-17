import mongoose from 'mongoose'

const Orders = new mongoose.Schema({
  orderId: String,
  customerName: String,
  customerNumber: Number,
  customerEmail: String,
  operatorId: Number,
  products: [{quantity: Number,amount: Number,productId: Number}],
  total: Number,
  razorpayLink: String
});

const orderModel = mongoose.model('Orders', Orders);

module.exports = operatorModel


