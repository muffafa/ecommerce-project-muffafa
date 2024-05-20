import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useCustomAxios from "../../hooks/useCustomAxios";
import "./SonGuncellenenUrunler.css";

const SonGuncellenenUrunler = () => {
  const customAxios = useCustomAxios();
  const axiosRef = useRef(customAxios);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUpdatedProducts();
  }, []);

  const fetchUpdatedProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosRef.current.get("/products/top-updated");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Ürünleri çekerken hata oluştu:", error);
      setLoading(false);
    }
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " yıl önce";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " ay önce";
    }

    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " gün önce";
    }

    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " saat önce";
    }

    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " dakika önce";
    }

    return Math.floor(seconds) + " saniye önce";
  }

  return (
    <div className="yeni-urunler">
      <h1>
        Tüm <span>Taptaze</span> Ürünler
      </h1>
      <hr />
      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : (
        <div className="yeni-urunler-container">
          {products.map((product, i) => (
            <Link to={`/product/${product._id}`} key={i}>
              <div className="product" id={product._id}>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
                <div className="product-prices">
                  <span className="product-price-new">
                    {product.currentPrice}₺
                  </span>
                  {product.oldPrice && (
                    <span className="product-price-old">
                      {product.oldPrice}₺
                    </span>
                  )}
                </div>
                <p className="product-updated">
                  Güncellenme zamanı: {timeSince(product.updatedAt)}
                </p>
                <div className="product-button-container">
                  <button className="purchase-button">Göz At</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SonGuncellenenUrunler;
