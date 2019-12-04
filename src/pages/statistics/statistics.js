import React from 'react';
import MainHeader from "../../componens/mainHeader/mainHeader";
import NavBar from "../../componens/navbar/navbar";

import StatisticsContainer from "../../componens/statisticsContainer/statisticsContainer";

const Statistics = () => (
   <div className="page-container">
      <MainHeader isMainHeader={false}/>
      <NavBar/>
      <div className="page-content">
         <StatisticsContainer/>
      </div>
   </div>
);

export default Statistics;
