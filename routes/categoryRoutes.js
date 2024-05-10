const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Kategorileri getir ve yeni kategori ekle
router.route('/')
  .get(getCategories)
  .post(createCategory);

// Tekil kategori işlemleri
router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;