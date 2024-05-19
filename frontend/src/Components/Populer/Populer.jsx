import "./Populer.css"
import data_product from "../Assets/data";
import Product from "../Product/Product";

function Populer(){

    return(

        <div className="populer">
            <h1>Sizin İçin <span>Taptaze</span> 😋</h1>
            <hr />
            <div className="popular-product">
                {data_product.map((product, i)=>{
                    return <Product key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}></Product>
                })}
            </div>
        </div>

    )

}

export default Populer;