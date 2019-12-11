import React from 'react';
import MainHeader from "../../componens/mainHeader/mainHeader";
import NavBar from "../../componens/navbar/navbar";

import TariffPaymentContainer from "../../componens/tariffContainer/tariffPaymentContainer";

const TariffPayment = () => (
   <div className="page-container">
      <MainHeader isServiceHeader/>
      <NavBar isServiceNav/>
      <TariffPaymentContainer/>
   </div>
);

export default TariffPayment;
