import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCustomAxios from "../../hooks/useCustomAxios";
import "./YeniUrunler.css";

const YeniUrunler = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const axios = useCustomAxios();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategorileri çekerken hata oluştu:", error);
    }
  };

  const fetchProducts = async (categoryId = "") => {
    const endpoint = categoryId
      ? `/products?category=${categoryId}`
      : "/products";
    try {
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error("Ürünleri çekerken hata oluştu:", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedCategory = event.target.value;
    setFilterCategory(selectedCategory);
    fetchProducts(selectedCategory);
  };

  return (
    <div className="yeni-urunler">
      <h1>
        Yepyeni <span>Taptaze</span>
      </h1>
      <hr />
      <div className="filter">
        <select value={filterCategory} onChange={handleFilterChange}>
          <option value="">Tümü</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
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
                  <span className="product-price-old">{product.oldPrice}₺</span>
                )}
              </div>
              <div className="product-button-container">
                <button className="purchase-button">Göz At</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YeniUrunler;
