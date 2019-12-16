import React from 'react';

import MainHeader from "../../componens/mainHeader/mainHeader";
import NavBar from "../../componens/navbar/navbar";

import TariffHistoryContainer from "../../componens/tariffContainer/tariffHistoryContainer";

const TariffHistory = () => (
   <div className="page-container">
      <MainHeader isServiceHeader/>
      <NavBar isServiceNav/>
      <TariffHistoryContainer/>
   </div>
);

export default TariffHistory;
