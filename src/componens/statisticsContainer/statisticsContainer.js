import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import StatisticsInfo from "./statisticsInfo/statisticsInfo";
import StatisticsSchedule from "./statisticsSchedule/statisticsSchedule";

const StatisticsContainer = () => {
   return (
      <div className="statistics-container pv1-flex pv1-j-sb">
         <StatisticsInfo/>
         <StatisticsSchedule/>
      </div>
   );
};

export default compose(
   withRouter,
   connect()
)(StatisticsContainer);
