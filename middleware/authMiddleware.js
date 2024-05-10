const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token'ı Bearer'dan ayır
      token = req.headers.authorization.split(" ")[1];

      // Token'ı doğrula ve kullanıcı ID'sini al
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı ID kullanarak bul ve parola bilgisini getirme
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ message: "Yetkilendirme başarısız, token geçersiz" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ message: "Yetkilendirme başarısız, token bulunamadı" });
  }
};

module.exports = { protect };
