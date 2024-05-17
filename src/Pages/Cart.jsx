import CartItems from "../Components/CartItems";
import Teklifler from "../Components/Teklifler";

function Cart() {
  return (
    <div>
      <CartItems></CartItems>
      <div style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Teklifler></Teklifler>
      </div>
    </div>
  );
}

export default Cart;
