import PropTypes from "prop-types";
import "./Product.css";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className="product">
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
      <div className="product-prices">
        <div className="product-price-new">{props.new_price}₺</div>
        <div className="product-price-old">{props.old_price}₺</div>
      </div>
      <div className="product-button-container">
        <Link to={`/product/${props.id}`}>
          <button className="purchase-button">Göz At!</button>
        </Link>
      </div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  new_price: PropTypes.number.isRequired,
  old_price: PropTypes.number,
};

export default Product;
