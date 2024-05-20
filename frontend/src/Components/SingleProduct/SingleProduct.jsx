import { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCustomAxios from "../../hooks/useCustomAxios";
import DescriptionBox from "../DescriptionBox/DescriptionBox";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./SingleProduct.css";
import { MarketContext } from "../../Context/MarketContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customAxios = useCustomAxios();
  const axiosRef = useRef(customAxios);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(MarketContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosRef.current.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Ürün detayları çekerken hata oluştu.");
        console.error("Ürün detayları çekerken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
      setError(null);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setError(null);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="single-product">
        <div className="single-product-left">
          <div className="single-product-image">
            <img
              className="single-product-main-image"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
        </div>
        <div className="single-product-right">
          <h1>{product.name}</h1>
          <div className="single-product-prices">
            <div className="single-product-price-old">{product.oldPrice}₺</div>
            <div className="single-product-price-new">
              {product.currentPrice}₺
            </div>
          </div>
          <div className="single-product-stock">Stok: {product.stock}</div>
          <div className="add-to-cart-counter">
            <FontAwesomeIcon
              icon={faMinus}
              className="cart-adjust-quantity add-to-cart-minus"
              onClick={decrementQuantity}
            ></FontAwesomeIcon>
            <p className="add-to-cart-quantity">{quantity}</p>
            <FontAwesomeIcon
              icon={faPlus}
              className="cart-adjust-quantity add-to-cart-plus"
              onClick={incrementQuantity}
            ></FontAwesomeIcon>
          </div>
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={quantity === 0}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
      <DescriptionBox description={product.description} />
      {product.category && (
        <RelatedProducts
          categoryId={product.category._id}
          currentProductId={product._id}
        />
      )}
    </>
  );
};

export default SingleProduct;
