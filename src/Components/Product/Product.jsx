import "./Product.css"

function Product(props){

    return(
        <div className="product">
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className="product-prices">
                <div className="product-price-new">{props.new_price}₺</div>
                <div className="product-price-old">{props.old_price}₺</div>
            </div>
            <div className="product-button-container">
                <button className="purchase-button">Sepete Ekle</button>
            </div>
        </div>
    )

}

export default Product;