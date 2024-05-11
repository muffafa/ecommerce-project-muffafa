const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getProducts) // Tüm kullanıcılar ürünleri görebilir
  .post(protect, createProduct); // Sadece adminler yeni ürün ekleyebilir

router
  .route("/:id")
  .get(getProductById) // Tüm kullanıcılar belirli bir ürünü görebilir
  .put(protect, updateProduct) // Sadece adminler ürün güncelleyebilir
  .delete(protect, deleteProduct); // Sadece adminler ürün silebilir

module.exports = router;
