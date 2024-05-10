import "./SingleProduct.css"

function SingleProduct(){

    return(

        <div className="single-product">
            <div className="single-product-left">
                <div className="product-gallery">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
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
                <button className="add-to-cart">Sepete Ekle</button>
                <p></p>
            </div>
        </div>

    )


}

export default SingleProduct