const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true }, // Stok bilgisi
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  currentPrice: { type: Number, required: true },
  oldPrice: { type: Number },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
