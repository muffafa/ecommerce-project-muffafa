import Newsletter from "../Components/Newsletter";
import Populer from "../Components/Populer";
import Teklifler from "../Components/Teklifler";
import YeniUrunler from "../Components/YeniUrunler";

function Market() {
  return (
    <>
      <Populer></Populer>
      <Teklifler></Teklifler>
      <YeniUrunler></YeniUrunler>
      <Newsletter></Newsletter>
    </>
  );
}

export default Market;
