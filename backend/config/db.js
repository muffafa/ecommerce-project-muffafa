const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB bağlantısı başarılı.");
  } catch (err) {
    console.error("MongoDB bağlantı hatası: ", err.message);
    process.exit(1); // Sunucuyu hata ile kapat
  }
};

module.exports = connectDB;
