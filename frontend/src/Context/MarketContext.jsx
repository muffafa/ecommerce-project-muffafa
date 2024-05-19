import PropTypes from "prop-types";
import { createContext, useState } from "react";
import tum_urunler from "../Components/Assets/tum_urunler";

export const MarketContext = createContext(null);

const MarketContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      const totalQuantity = existingProduct
        ? existingProduct.quantity + quantity
        : quantity;

      if (totalQuantity > product.stock) {
        return prevCart;
      }

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: totalQuantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const contextValue = {
    tum_urunler,
    cart,
    setCart,
    addToCart,
    removeFromCart,
  };

  return (
    <MarketContext.Provider value={contextValue}>
      {props.children}
    </MarketContext.Provider>
  );
};

MarketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MarketContextProvider;
