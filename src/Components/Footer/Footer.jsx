import "./Footer.css";
import logo from "../Assets/logo.png";
import { useLocation } from "react-router-dom";
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
          <ul className="footer-links">
            <li className="footer-link">Anasayfa</li>
            <li className="footer-link">Ürünler</li>
            <li className="footer-link">Günlük İhtiyaç</li>
            <li className="footer-link">Fırsat</li>
            <li className="footer-link">İletişim</li>
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
