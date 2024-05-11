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

      if (req.user && req.user.isAdmin) {
        next();
      } else {
        res
          .status(401)
          .json({ message: "Yetkisiz erişim, admin yetkisi gerekli." });
      }
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
