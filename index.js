const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Çevre değişkenlerini yükler
connectDB(); // Veritabanı bağlantısını başlatır

const app = express();

app.use(express.json()); // Body parser middleware

app.get("/", (req, res) => res.send("TapTaze API Çalışıyor!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Sunucu ${PORT} numaralı port üzerinde çalışıyor.`)
);

const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
