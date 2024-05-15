import "./PaymentSuccess.css"

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
                <button className="back-to-shop">Alışverişe Devam! 🛒</button>
            </div>
        </div>

    )

}

export default PaymentSuccess