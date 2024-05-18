import "./CartItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { MarketContext } from "../../Context/MarketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Import the useAuth hook

function CartItems() {
  const { cart, setCart, addToCart, removeFromCart } =
    useContext(MarketContext);
  const { user } = useAuth(); // Get the user from the useAuth hook
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleApplyPromoCode = () => {
    if (promoCode === "TapTaze10") {
      setDiscount(0.1); // 10% discount
      setError(""); // Clear any previous error
    } else {
      setError("Geçersiz promosyon kodu");
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0
    );
    return subtotal * (1 - discount);
  };

  const handlePurchase = async () => {
    if (!user) {
      alert("Ürünleri satın almak için önce giriş yapmalısınız.");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/products/purchase",
        {
          products: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCart([]);
        navigate("/payment");
      } else {
        setError(
          "Satın alma işlemi sırasında hata oluştu: " + response.data.message
        );
      }
    } catch (error) {
      console.error("Satın alma işlemi sırasında hata oluştu:", error);
      setError("Satın alma işlemi sırasında hata oluştu: " + error.message);
    }
  };

  const handleIncrementQuantity = (product) => {
    if (product.quantity < product.stock) {
      addToCart(product, 1);
    }
  };

  const handleDecrementQuantity = (product) => {
    if (product.quantity > 1) {
      addToCart(product, -1);
    }
  };

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Ürünler</p>
        <p>İsim</p>
        <p>Fiyat</p>
        <p>Miktar</p>
        <p>Toplam</p>
        <p>Kaldır</p>
      </div>
      <hr />
      {cart.map((item) => (
        <div
          key={item._id}
          className="cart-items-format cart-items-format-main"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="product-thumbnail"
          />
          <p>{item.name}</p>
          <p>{item.currentPrice}₺</p>
          <div className="quantity-controls">
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() => handleDecrementQuantity(item)}
            />
            <button className="cart-items-quantity">{item.quantity}</button>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => handleIncrementQuantity(item)}
            />
          </div>
          <p>{item.currentPrice * item.quantity}₺</p>
          <FontAwesomeIcon
            icon={faXmark}
            className="cart-icon-remove"
            onClick={() => removeFromCart(item._id)}
          ></FontAwesomeIcon>
        </div>
      ))}
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Sepet Toplamı</h1>
          {discount > 0 && (
            <>
              <div className="cart-items-total-item">
                <p>Ara Toplam</p>
                <p>
                  {cart
                    .reduce(
                      (total, item) =>
                        total + item.currentPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                  ₺
                </p>
              </div>
              <div className="cart-items-total-item">
                <p>İndirim</p>
                <p>
                  {(
                    cart.reduce(
                      (total, item) =>
                        total + item.currentPrice * item.quantity,
                      0
                    ) * discount
                  ).toFixed(2)}
                  ₺
                </p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-items-total-item">
            <p>Toplam</p>
            <p>{calculateTotal().toFixed(2)}₺</p>
          </div>
          <button onClick={handlePurchase}>Ödemeye Geç</button>
        </div>
        <div className="promocode">
          <p>Varsa promosyon kodunuzu burada kullanabilirsiniz.</p>
          <div className="cart-items-promobox">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promosyon Kodunuz"
            />
            <button onClick={handleApplyPromoCode}>Gönder</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
