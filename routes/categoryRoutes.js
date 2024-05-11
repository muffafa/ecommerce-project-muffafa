const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(getCategories) // Tüm kullanıcılar kategorileri görebilir
  .post(protect, createCategory); // Sadece adminler kategori ekleyebilir

router
  .route("/:id")
  .get(getCategoryById) // Tüm kullanıcılar belirli bir kategoriyi görebilir
  .put(protect, updateCategory) // Sadece adminler kategori güncelleyebilir
  .delete(protect, deleteCategory); // Sadece adminler kategori silebilir

module.exports = router;
