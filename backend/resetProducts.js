const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust the path if needed
const productsData = require("./products.json");
require("dotenv").config(); // To load environment variables from a .env file

const resetProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    // Delete all existing products
    await Product.deleteMany({});
    console.log("All existing products deleted.");

    // Add new products with timestamps
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
