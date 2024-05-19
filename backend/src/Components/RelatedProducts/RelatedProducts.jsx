import PropTypes from "prop-types";
import "./RelatedProducts.css";
import useCustomAxios from "../../hooks/useCustomAxios";
import { useState, useEffect } from "react";
import Product from "../Product/Product";

function RelatedProducts({ categoryId, currentProductId }) {
  const axios = useCustomAxios();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`/products?category=${categoryId}`);
        const filteredProducts = response.data.filter(
          (product) => product._id !== currentProductId
        );
        setRelatedProducts(filteredProducts.slice(0, 4));
      } catch (error) {
        console.error("İlgili ürünler getirilirken bir hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchRelatedProducts();
    }
  }, [categoryId, currentProductId, axios]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (relatedProducts.length === 0) {
    return null; // İlgili ürünler yoksa bileşeni render etme
  }

  return (
    <div className="related-products">
      <h1>İlgili Ürünler</h1>
      <hr />
      <div className="related-products-item">
        {relatedProducts.map((product, i) => (
          <Product
            key={i}
            id={product._id}
            name={product.name}
            image={product.imageUrl}
            new_price={product.currentPrice}
            old_price={product.oldPrice}
          />
        ))}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  categoryId: PropTypes.string.isRequired,
  currentProductId: PropTypes.string.isRequired,
};

export default RelatedProducts;
