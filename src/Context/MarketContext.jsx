import React from "react";
import { createContext } from "react";
import tum_urunler from "../Components/Assets/tum_urunler";

export const MarketContext = createContext(null);

const MarketContextProvider = (props) =>{

    const contextValue = {tum_urunler};

    return(
        <MarketContext.Provider value={contextValue}>
            {props.children}
        </MarketContext.Provider>
    )

}

export default MarketContextProvider;