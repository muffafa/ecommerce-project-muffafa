const Category = require('../models/Category');

// Tüm kategorileri getir
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre kategori getir
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni kategori ekle
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kategoriyi güncelle
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kategoriyi sil
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      res.json({ message: 'Kategori silindi.' });
    } else {
      res.status(404).json({ message: 'Silinecek kategori bulunamadı.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
