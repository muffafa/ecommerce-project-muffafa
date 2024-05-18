import { useContext } from "react";
import CartItems from "../Components/CartItems";
import Teklifler from "../Components/Teklifler";
import { MarketContext } from "../Context/MarketContext";

function Cart() {
  const { cart } = useContext(MarketContext);

  return (
    <div>
      {cart.length > 0 ? (
        <CartItems />
      ) : (
        <div style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Teklifler />
        </div>
      )}
    </div>
  );
}

export default Cart;
