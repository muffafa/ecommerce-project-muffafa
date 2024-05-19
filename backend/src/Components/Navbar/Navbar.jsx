import "./Navbar.css";
import logo from "../Assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MarketContext } from "../../Context/MarketContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useContext(MarketContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Kullanıcıyı anasayfaya yönlendir
  };

  return (
    <div className="navbar">
      <div className="taptaze-logo">
        <Link to={"/"}>
          <img src={logo} alt="TapTaze" />
        </Link>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to={"/market"}>Market</Link>
        </li>

        {user && user.isAdmin && (
          <li className="nav-item">
            <Link to={"/admin"}>Admin Panel</Link>
          </li>
        )}
      </ul>
      <div className="nav-login-cart">
        {user ? (
          <div>
            <span style={{ color: "#dddddd" }}>
              Merhaba,
              <div>{user.name}</div>
            </span>
            <button style={{ marginTop: "10px" }} onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button>Giriş Yap</button>
          </Link>
        )}
        <Link to={"/cart"}>
          <FontAwesomeIcon
            className="icon-nav-cart"
            icon={faCartShopping}
          ></FontAwesomeIcon>
        </Link>
        <div className="nav-cart-count">{cart.length}</div>
      </div>
    </div>
  );
}

export default Navbar;
