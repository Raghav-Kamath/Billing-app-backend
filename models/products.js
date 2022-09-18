const mongoose=require('mongoose')

const Products = new mongoose.Schema({
  name: String,
  id: {type:Number,unique:true},
  category: String,
  color: String,
  amount: Number,
});

const productModel = mongoose.model('Products', Products);

module.exports = productModel


