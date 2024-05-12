const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Kullanıcıyı sonraki middleware'e ya da route handler'a geçir
    } catch (error) {
      res
        .status(401)
        .json({ message: "Token doğrulanamadı, yetkisiz erişim." });
    }
  } else {
    res.status(401).json({ message: "Yetkilendirme tokenı bulunamadı." });
  }
};

module.exports = { protect };
