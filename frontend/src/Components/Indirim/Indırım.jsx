import "./Indirim.css";
import { useEffect, useState, useRef } from "react";
import useCustomAxios from "../../hooks/useCustomAxios";
import Product from "../Product/Product";

function Indirim() {
  const customAxios = useCustomAxios();
  const axiosRef = useRef(customAxios);
  const [topDiscountedProducts, setTopDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopDiscountedProducts = async () => {
      try {
        const response = await axiosRef.current.get("/products/top-discounted");
        setTopDiscountedProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch top discounted products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDiscountedProducts();
  }, []);

  return (
    <div className="populer">
      <h1>
        Sizin İçin <span>Taptaze</span> ve <span>İndirimde!</span> 😋
      </h1>
      <hr />
      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : (
        <div className="popular-product">
          {topDiscountedProducts.map((product, i) => (
            <Product
              key={i}
              id={product._id}
              name={product.name}
              image={product.imageUrl}
              new_price={product.currentPrice}
              old_price={product.oldPrice}
              discountPercentage={product.discountPercentage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Indirim;
