const mongoose = require("mongoose");
const Product = require("./models/Product"); 
const productsData = require("./products.json");
require("dotenv").config();

const resetProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("All existing products deleted.");

    for (let productData of productsData) {
      const product = new Product(productData);
      await product.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log("All products added successfully.");
  } catch (error) {
    console.error("Error resetting products:", error);
  } finally {
    await mongoose.connection.close();
  }
};

resetProducts();
