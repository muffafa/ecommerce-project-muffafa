const Product = require("../models/Product");

// Tüm ürünleri getir
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name"); // Assuming you want to show category names
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve products", error: error.message });
  }
};

// ID'ye göre ürün getir
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name"
    ); // Populate if needed
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

// Yeni ürün ekle
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    stock,
    category,
    currentPrice,
    oldPrice,
    imageUrl,
  } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      stock,
      category,
      currentPrice,
      oldPrice,
      imageUrl, // Ensure the field name matches your Mongoose model
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Product creation failed", error: error.message });
  }
};

// Ürünü güncelle
exports.updateProduct = async (req, res) => {
  const {
    name,
    description,
    stock,
    category,
    currentPrice,
    oldPrice,
    imageUrl,
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, stock, category, currentPrice, oldPrice, imageUrl },
      { new: true, runValidators: true }
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found for update." });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Ürünü sil
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Product deleted successfully." });
    } else {
      res.status(404).json({ message: "Product not found for deletion." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
