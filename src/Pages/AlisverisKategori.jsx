import { useContext } from "react";
import "./CSS/AlisverisKategori.css"

function AlisverisKategori(){

    const {tum_urunler} = useContext(MarketContext);

    return(

        <div className="alisveris-kategori">

        </div>

    )

}

export default AlisverisKategori;