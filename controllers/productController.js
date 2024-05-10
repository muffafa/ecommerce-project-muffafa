const Product = require("../models/Product");

// Tüm ürünleri getir
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre ürün getir
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Ürün bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni ürün ekle
exports.createProduct = async (req, res) => {
  const { name, category, currentPrice, oldPrice, isDeal, image } = req.body;
  try {
    const newProduct = new Product({
      name,
      category,
      currentPrice,
      oldPrice,
      isDeal,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ürünü güncelle
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ürünü sil
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Ürün silindi." });
    } else {
      res.status(404).json({ message: "Silinecek ürün bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
