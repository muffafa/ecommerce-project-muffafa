import Hero from "../Components/Hero/Hero"
import Newsletter from "../Components/Newsletter/Newsletter";
import Populer from "../Components/Populer/Populer";
import Teklifler from "../Components/Teklifler/Teklifler";
import YeniUrunler from "../Components/YeniUrunler/YeniUrunler";

function Market(){

    return(
        <>
        <Hero></Hero>
        <Populer></Populer>
        <Teklifler></Teklifler>
        <YeniUrunler></YeniUrunler>
        <Newsletter></Newsletter>
        </>
    )

}

export default Market;