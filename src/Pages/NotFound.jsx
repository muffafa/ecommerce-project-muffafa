import { Link } from "react-router-dom";
import "./CSS/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Bayat Bir Sayfa!</h1>
      <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Link to="/">Anasayfaya Dön</Link>
    </div>
  );
};

export default NotFound;
