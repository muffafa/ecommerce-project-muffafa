const Product = require("../models/Product");

// Tüm ürünleri getir, isteğe bağlı olarak kategoriye göre filtrele
exports.getProducts = async (req, res) => {
  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  try {
    const products = await Product.find(categoryFilter).populate(
      "category",
      "name"
    );
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
      imageUrl,
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

// Ürünleri satın alma fonksiyonu
exports.purchaseProducts = async (req, res) => {
  // Kullanıcı giriş yapmamışsa erişimi engelle
  if (!req.user) {
    return res.status(401).json({ message: "Kullanıcı girişi gereklidir." });
  }

  const productsToPurchase = req.body.products; // { products: [{ productId: 'id', quantity: 1 }, ...] }

  try {
    // Ürün ve miktarlarının stokta olup olmadığını kontrol et
    const productChecks = await Promise.all(
      productsToPurchase.map((item) =>
        Product.findById(item.productId).then((product) => ({
          productId: item.productId,
          available: product && product.stock >= item.quantity,
          quantity: item.quantity,
          stock: product.stock,
        }))
      )
    );

    // Eğer tüm ürünler stokta varsa satın alma işlemini gerçekleştir
    if (productChecks.every((item) => item.available)) {
      const purchaseTransactions = productChecks.map((item) =>
        Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { new: true }
        )
      );

      await Promise.all(purchaseTransactions);

      res.status(200).json({
        message: "Ürünler başarıyla satın alındı",
        products: productChecks,
      });
    } else {
      // Stokta olmayan ürünler varsa hata mesajı döndür
      const unavailableProducts = productChecks.filter(
        (item) => !item.available
      );
      res.status(400).json({
        message: "Bazı ürünler stokta yeterli miktarda değil",
        details: unavailableProducts,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ürün satın alma işlemi sırasında bir hata oluştu",
      error: error.message,
    });
  }
};
