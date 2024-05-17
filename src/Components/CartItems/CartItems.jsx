import "./CartItems.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CartItems() {
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
      <div>
        <div className="cart-items-format cart-items-format-main">
          <img src="" alt="" className="product-thumbnail" />
          <p>Ürün İsmi</p>
          <p>00.00₺</p>
          <button className="cart-items-quantity">0</button>
          <p>00.00₺</p>
          <FontAwesomeIcon
            icon={faXmark}
            className="cart-icon-remove"
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Sepet Toplamı</h1>
          <div>
            <div className="cart-items-total-item">
              <p>Ara Toplam</p>
              <p>00.00₺</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <p>Toplam</p>
              <p>00.00₺</p>
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
