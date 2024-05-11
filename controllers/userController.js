const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Tüm kullanıcıları getir
exports.getUsers = async (req, res) => {
  try {
    // Yalnızca adminler tüm kullanıcıları görebilir
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ID'ye göre kullanıcı getir
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni kullanıcı kaydetme
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "E-posta adresi zaten kullanımda." });
    }

    // Şifreyi burada hashlemeyin, Mongoose modeli bunu halleder
    const newUser = new User({
      name,
      email,
      password, // Doğrudan şifreyi burada kullan
      isAdmin: false,
    });

    await newUser.save();
    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Kullanıcı kaydedilirken bir hata oluştu.",
        error: error.message,
      });
  }
};

// Kullanıcı girişi
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Hatalı şifre." });
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kullanıcıyı güncelle
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Kullanıcıyı sil
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Silinecek kullanıcı bulunamadı." });
    }
    res.json({ message: "Kullanıcı silindi." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
