import "./CartItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MarketContext } from "../../Context/MarketContext";

function CartItems() {
  const { cart, removeFromCart } = useContext(MarketContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.currentPrice * item.quantity, 0);
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
        <div key={item._id} className="cart-items-format cart-items-format-main">
          <img src={item.imageUrl} alt={item.name} className="product-thumbnail" />
          <p>{item.name}</p>
          <p>{item.currentPrice}₺</p>
          <button className="cart-items-quantity">{item.quantity}</button>
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
          <div>
            <div className="cart-items-total-item">
              <p>Ara Toplam</p>
              <p>{calculateTotal()}₺</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <p>Toplam</p>
              <p>{calculateTotal()}₺</p>
            </div>
          </div>
          <Link to={"/payment"}>
            <button>Ödemeye Geç</button>
          </Link>
        </div>
        <div className="promocode">
          <p>Varsa promosyon kodunuzu burada kullanabilirsiniz.</p>
          <div className="cart-items-promobox">
            <input type="text" name="" placeholder="Promosyon Kodunuz" />
            <button>Gönder</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
