import yeni_urunler from "../Assets/yeni_urunler"
import Product from "../Product/Product"
import "./YeniUrunler.css"

function YeniUrunler(){
    
    return(

        <div className="yeni-urunler">
            <h1>Yepyeni <span>Taptaze</span></h1>
            <hr />
            <div className="yeni-urunler-container">
                {yeni_urunler.map((product,i)=>{
                    return <Product key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}></Product>
                })}
            </div>
        </div>

    )

}

export default YeniUrunler