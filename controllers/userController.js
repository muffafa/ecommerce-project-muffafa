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
  const requestedUserId = req.params.id;
  const requestingUserId = req.user._id;
  const requestingUserIsAdmin = req.user.isAdmin;

  try {
    const user = await User.findById(requestedUserId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Kullanıcı kendi bilgilerini görüntülüyorsa veya kullanıcı admin ise
    if (
      requestingUserId.toString() === requestedUserId ||
      requestingUserIsAdmin
    ) {
      res.json(user);
    } else {
      res.status(403).json({ message: "Bu bilgilere erişim yetkiniz yok." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı bilgileri getirilirken bir hata oluştu",
      error: error.message,
    });
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
    res.status(500).json({
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
// Kullanıcıyı güncelle
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userMakingRequest = req.user._id;
  const isAdmin = req.user.isAdmin;

  if (userId !== userMakingRequest.toString() && !isAdmin) {
    return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
  }

  try {
    const { name, email, password } = req.body;
    const updateData = {};

    // İsim, e-posta ve yönetici durumu güncellemeleri
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (req.body.hasOwnProperty("isAdmin") && isAdmin) {
      updateData.isAdmin = req.body.isAdmin;
    }

    // Şifre yalnızca verilmişse güncellenir
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Kullanıcı güncellenirken bir hata oluştu",
      error: error.message,
    });
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

exports.addToCart = async (req, res) => {
  const userId = req.user._id; // Oturum açmış kullanıcının ID'si
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );
    if (cartItemIndex > -1) {
      // Ürün zaten sepette var, miktarı güncelle
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Ürün sepette yok, yeni ürün ekle
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Sepete ürün eklenirken bir hata oluştu",
      error: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    // Ürünü sepette bul ve çıkar
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Sepetten ürün çıkarılırken bir hata oluştu",
      error: error.message,
    });
  }
};

exports.viewCart = async (req, res) => {
  const userId = req.user._id; // Oturum açan kullanıcının ID'si

  try {
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const cartItems = user.cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      isAvailable: item.quantity <= item.product.stock,
    }));

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: "Sepet görüntülenirken bir hata oluştu",
      error: error.message,
    });
  }
};

exports.purchaseItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    const itemsToPurchase = user.cart.filter(
      (item) => item.product.stock >= item.quantity
    );

    // Stokları güncelle ve satın alma işlemlerini kaydet
    await Promise.all(
      itemsToPurchase.map((item) => {
        item.product.stock -= item.quantity;
        return item.product.save();
      })
    );

    // Satın alınan ürünleri sepetten çıkar
    user.cart = user.cart.filter((item) => !itemsToPurchase.includes(item));
    await user.save();

    res.json({ message: "Satın alma işlemi başarılı", cart: user.cart });
  } catch (error) {
    res.status(500).json({
      message: "Satın alma işlemi sırasında bir hata oluştu",
      error: error.message,
    });
  }
};
