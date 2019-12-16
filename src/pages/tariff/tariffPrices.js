import React from 'react';
import MainHeader from "../../componens/mainHeader/mainHeader";
import NavBar from "../../componens/navbar/navbar";

import TariffPricesContainer from "../../componens/tariffContainer/tariffPricesContainer"

const TariffPrices = () => (
   <div className="page-container">
      <MainHeader isServiceHeader/>
      <NavBar isServiceNav/>
      <TariffPricesContainer/>
   </div>
);

export default TariffPrices;
