import "./BosSepet.css";
import groceryBags from "../Assets/grocery-bags.png";
import { Link } from "react-router-dom";

function BosSepet() {
  return (
    <div className="teklifler">
      <div className="teklifler-left">
        <h1>Olamaz! Sepetin Daha Boş Mu? 😱</h1>
        <h1 className="teklifler-subtitle">Acele Et!</h1>
        <p>
          Yalnızca kısıtlı bir süreliğine geçerli sana özel olan {}
          <span style={{ color: "#FF8D27" }}>
            <b>&quot;TapTaze10&quot;</b>
          </span>{" "}
          kodunu kullan ve sepette anında %10 indirim kazan!
        </p>
        <Link to="/market" style={{ textDecoration: "none" }}>
          <button>Hemen Gözat</button>
        </Link>
      </div>
      <div className="teklifler-right">
        <img src={groceryBags} alt="Vaktin Daralıyor!" />
      </div>
    </div>
  );
}

export default BosSepet;
