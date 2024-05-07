import "./Navbar.css"
import logo from "../Assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

function Navbar(){

return(

    <div className="navbar">
        <div className="taptaze-logo">
            <img src={logo} alt="TapTaze" />
        </div>
        <ul className="nav-menu">
            <li className="nav-item">Market</li>
            <li className="nav-item">Günlük İhtiyaç</li>
            <li className="nav-item">Fırsat</li>
        </ul>
        <div className="nav-login-cart">
            <button>Giriş Yap</button>
            <FontAwesomeIcon className="icon-nav-cart" icon={faCartShopping}></FontAwesomeIcon>
            <div className="nav-cart-count">0</div>
        </div>
    </div>

)

}

export default Navbar