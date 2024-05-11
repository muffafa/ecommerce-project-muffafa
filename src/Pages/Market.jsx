import Newsletter from "../Components/Newsletter/Newsletter";
import Populer from "../Components/Populer/Populer";
import Teklifler from "../Components/Teklifler/Teklifler";
import YeniUrunler from "../Components/YeniUrunler/YeniUrunler";

function Market(){

    return(
        <>
        <Populer></Populer>
        <Teklifler></Teklifler>
        <YeniUrunler></YeniUrunler>
        <Newsletter></Newsletter>
        </>
    )

}

export default Market;