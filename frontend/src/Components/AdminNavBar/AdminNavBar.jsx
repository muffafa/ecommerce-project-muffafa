import "../Navbar/Navbar.css";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const { user, logout } = useAuth();
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
          <Link to="/admin/products">Ürün Yönetimi</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/categories">Kategori Yönetimi</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users">Kullanıcı Yönetimi</Link>
        </li>
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
      </div>
    </div>
  );
};

export default AdminNavBar;
