const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

// Tüm kullanıcıları getir ve yeni kullanıcı ekle
router.route('/')
  .get(getUsers)
  .post(createUser);

// Tekil kullanıcı işlemleri
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Kullanıcı girişi
router.post('/login', loginUser);

module.exports = router;
