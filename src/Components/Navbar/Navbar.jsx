import "./Navbar.css"
import logo from "../Assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

function Navbar(){

return(

    <div className="navbar">
        <div className="taptaze-logo">
            <Link to={"/"}>
                <img src={logo} alt="TapTaze" />
            </Link>
        </div>
        <ul className="nav-menu">
            <Link to={"/market"}>
                <li className="nav-item">Market</li>
            </Link>
        </ul>
        <div className="nav-login-cart">
            <Link to={"/login"}>
                <button>Giriş Yap</button>
            </Link>
            <Link to={"/cart"}>
                <FontAwesomeIcon className="icon-nav-cart" icon={faCartShopping}></FontAwesomeIcon>
            </Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>

)

}

export default Navbar