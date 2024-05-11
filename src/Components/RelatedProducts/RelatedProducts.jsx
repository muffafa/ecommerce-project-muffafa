import "./RelatedProducts.css"
import product_data from "../Assets/data"
import Product from "../Product/Product"

function RelatedProducts(){

    return(
        <div className="related-products">
            <h1>İlgili Ürünler</h1>
            <hr />
            <div className="related-products-item">
                {product_data.map((product, i)=>{
                    return <Product key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price}></Product>
                })}
            </div>
        </div>
    )

}

export default RelatedProducts
