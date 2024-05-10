const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  currentPrice: { type: Number, required: true },
  oldPrice: { type: Number },
  isDeal: { type: Boolean, default: false },
  image: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
