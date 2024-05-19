import "./PaymentSuccess.css"
import { Link } from "react-router-dom";


function PaymentSuccess(){

    return(

        <div className="payment-success-container">
            <div className="payment-success">
                <h1>Ödeme Başarılı 💸</h1>
                <p>
                    Bizi tercih ettiğiniz için teşekkür ederiz. Satın alımınız başarıyla
                    gerçekleşti. Ödemeniz alındı. Bir sonraki <span>TapTaze </span>
                     alışverişinizde görüşmek üzere.
                </p>
                <Link to={"/market"}> 
                    <button className="back-to-shop">Alışverişe Devam! 🛒</button>
                </Link>
            </div>
        </div>

    )

}

export default PaymentSuccess