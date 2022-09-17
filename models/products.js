import mongoose from 'mongoose'

const Products = new mongoose.Schema({
  productName: String,
  productId: Number,
  category: String,
  color: String,
  amount: Number,
});

const productModel = mongoose.model('Products', Products);

module.exports = productModel


