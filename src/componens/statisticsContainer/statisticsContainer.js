import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import StatisticsInfo from "./statisticsInfo/statisticsInfo";
import StatisticsSchedule from "./statisticsSchedule/statisticsSchedule";

import {getBotStatistics} from "../../actions/actionCreator";

const StatisticsContainer = props => {
   const [activeTab, setActiveTab] = useState(1);
   const [tabs] = useState([
      {name: 'Все', key: '1'},
      {name: 'Facebook', key: '2'},
      {name: 'Telegram', key: '3'},
      {name: 'ВКонтакте', key: '4'},
      {name: 'WhatsApp', key: '5'},
   ]);

   const changeTab = tabId => setActiveTab(tabId);

   useEffect(() => {
      props.getBotStatistics(props.match.params.botId);
   }, []);

   return (
      <div className="statistics-container pv1-flex pv1-j-sb">
         <StatisticsInfo tabs={tabs} activeTab={activeTab}/>
         <StatisticsSchedule tabs={tabs} changeTab={changeTab}/>
      </div>
   );
};

const mapStateToProps = ({botStatisticsReducer}) => ({
   statistics: botStatisticsReducer.statistics,
   loadingOfStatistics: botStatisticsReducer.loadingOfStatistics,
   errorOfStatistics: botStatisticsReducer.errorOfStatistics
});

const mapDispatchToProps = dispatch => ({
   getBotStatistics: botId => dispatch(getBotStatistics(botId))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(StatisticsContainer);
