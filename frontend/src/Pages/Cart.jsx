import { useContext } from "react";
import CartItems from "../Components/CartItems";
import { MarketContext } from "../Context/MarketContext";
import BosSepet from "../Components/BosSepet";

function Cart() {
  const { cart } = useContext(MarketContext);

  return (
    <div>
      {cart.length > 0 ? (
        <CartItems />
      ) : (
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <BosSepet />
        </div>
      )}
    </div>
  );
}

export default Cart;
