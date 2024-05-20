const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

// Tüm kullanıcıları getir
exports.getUsers = async (req, res) => {
  try {
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

  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const requestingUserId = req.user._id;
  const requestingUserIsAdmin = req.user.isAdmin;

  try {
    const user = await User.findById(requestedUserId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

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

    const newUser = new User({
      name,
      email,
      password,
      isAdmin: false,
      isSubscribedToNewsletter: false,
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
      isAdmin: user.isAdmin,
      isSubscribedToNewsletter: user.isSubscribedToNewsletter,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kullanıcıyı güncelle
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userMakingRequest = req.user._id;
  const isAdmin = req.user.isAdmin;

  if (userId !== userMakingRequest.toString() && !isAdmin) {
    return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
  }

  try {
    const { name, email, password, isSubscribedToNewsletter } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (req.body.hasOwnProperty("isAdmin") && isAdmin) {
      updateData.isAdmin = req.body.isAdmin;
    }
    if (req.body.hasOwnProperty("isSubscribedToNewsletter")) {
      updateData.isSubscribedToNewsletter = isSubscribedToNewsletter;
    }

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

const resend = new Resend(process.env.RESEND_KEY);

// Newsletter subscription
exports.subscribeNewsletter = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    user.isSubscribedToNewsletter = true;
    await user.save();

    try {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Bülten Aboneliğiniz Onaylandı",
        html: "<p>Bülten aboneliğiniz onaylandı!</p>",
      });

      if (error) {
        return res.status(200).json({
          message:
            "Bülten aboneliğiniz onaylandı fakat onay maili gönderilemedi.",
        });
      }

      res.status(200).json({ message: "Bülten aboneliğiniz onaylandı!" });
    } catch (emailError) {
      res.status(200).json({
        message:
          "Bülten aboneliğiniz onaylandı fakat onay maili gönderilemedi.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Bülten aboneliği sırasında bir hata oluştu.",
      error: error.message,
    });
  }
};
