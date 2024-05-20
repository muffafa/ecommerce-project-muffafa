import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import runningMan from "../Assets/running-man-icon.png";
import groceries from "../Assets/groceries.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <div>
          <div className="hero-icon-container">
            <h3>Bu Fırsat Kaçar!</h3>
            <img src={runningMan} className="hero-icon" alt="Running Man" />
          </div>
          <p>Fırsatları</p>
          <p className="hero-left-subtitle">Hemen Yakala!</p>
        </div>
        <Link to="/market" style={{ textDecoration: "none" }}>
          <div className="firsatlar-btn-container">
            <div>Tüm Ürünler</div>
            <FontAwesomeIcon
              className="hero-arrow-icon"
              icon={faCircleArrowRight}
            />
          </div>
        </Link>
      </div>
      <div className="hero-right">
        <img src={groceries} alt="Fırsatı Kaçırma!" />
      </div>
    </div>
  );
}

export default Hero;
