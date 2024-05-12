const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  viewCart,
  purchaseItems,
  addToCart,
  removeFromCart,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Genel kullanıcı işlemleri ve admin kontrolü
router
  .route("/")
  .get(protect, getUsers) // Sadece adminler tüm kullanıcıları görebilir
  .post(registerUser); // Herkes kayıt olabilir, admin kontrolü burada yapılmasın

// Kullanıcı girişi için ayrı bir rota
router.post("/login", loginUser); // Herkes giriş yapabilir

// ID ile spesifik kullanıcı işlemleri, koruma altında
router
  .route("/:id")
  .get(protect, getUserById) // Sadece adminler belirli bir kullanıcıyı görebilir
  .put(protect, updateUser) // Sadece adminler kullanıcı güncelleyebilir
  .delete(protect, deleteUser); // Sadece adminler kullanıcı silebilir

// Sepeti görüntüle
router.get("/cart", protect, viewCart);

// Ürünleri satın al
router.post("/cart/purchase", protect, purchaseItems);

// Sepete ürün ekle
router.post("/cart", protect, addToCart);

// Sepetten ürün çıkar
router.delete("/cart/:productId", protect, removeFromCart);

module.exports = router;
