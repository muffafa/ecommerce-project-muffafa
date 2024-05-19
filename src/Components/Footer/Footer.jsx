import "./Footer.css";
import logo from "../Assets/logo.png";
import { useLocation, Link } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Taptaze Logo" />
      </div>
      {!isAdminRoute && (
        <>
          <h1>Hızlı Menü</h1>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/">Anasayfa</Link>
            </li>
            <li className="nav-item">
              <Link to="/market">Market</Link>
            </li>
            <li className="nav-item">
              <a
                href="https://bmb.cu.edu.tr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                İletişim
              </a>
            </li>
          </ul>
        </>
      )}
      <div className="footer-copyright">
        <hr />
        <p>© 2024, Tüm Hakları Saklıdır.</p>
        <p className="authors">Mecit Melih HOCAOĞLU | Muhammed Mustafa SAVAR</p>
      </div>
    </footer>
  );
}

export default Footer;
