import DescriptionBox from "../DescriptionBox/DescriptionBox"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "./SingleProduct.css"
import { useState } from "react";

function SingleProduct(){

    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if(quantity > 0){
            setQuantity(quantity - 1);
        }
    }

    return(

        <>
        <div className="single-product">
            <div className="single-product-left">
                <div className="single-product-image">
                    <img className="single-product-main-image" src="" alt="" />
                </div>
            </div>
            <div className="single-product-right">
                <h1>Ürün İsmi</h1>
                <div className="single-product-prices">
                    <div className="single-product-price-old">00.00₺</div>
                    <div className="single-product-price-new">00.00₺</div>
                </div>
                <div className="single-product-description">Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Eveniet voluptatem suscipit fuga pariatur
                eligendi nesciunt reiciendis adipisci repellendus, vero repellat.
                </div>
                <div className="add-to-cart-counter">
                    <FontAwesomeIcon icon={faMinus} className="cart-adjust-quantity add-to-cart-minus" onClick={decrementQuantity}></FontAwesomeIcon>
                    <p className="add-to-cart-quantity">{quantity}</p>
                    <FontAwesomeIcon icon={faPlus} className="cart-adjust-quantity add-to-cart-plus" onClick={incrementQuantity}></FontAwesomeIcon>
                </div>
                <button className="add-to-cart">Sepete Ekle</button>
                <p></p>
            </div>
        </div>
        <DescriptionBox></DescriptionBox>
        <RelatedProducts></RelatedProducts>
        </>
        

    )


}

export default SingleProduct