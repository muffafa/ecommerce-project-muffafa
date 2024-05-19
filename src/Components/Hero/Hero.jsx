import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import runningMan from "../Assets/running-man-icon.png";
import groceries from "../Assets/groceries.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <div>
          <div className="hero-icon-container">
            <h3>Bu Fırsat Kaçar!</h3>
            <img src={runningMan} className="hero-icon" />
          </div>
          <p>Fırsatları</p>
          <p className="hero-left-subtitle">Hemen Yakala!</p>
        </div>
        <Link to="/market" style={{ textDecoration: "none" }}>
          {" "}
          {/* Replace a with Link */}
          <div className="firsatlar-btn-container">
            <div>Tüm Ürünler</div>
            <FontAwesomeIcon
              className="hero-arrow-icon"
              icon={faCircleArrowRight}
            ></FontAwesomeIcon>
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
