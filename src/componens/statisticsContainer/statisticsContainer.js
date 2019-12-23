import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import StatisticsInfo from "./statisticsInfo/statisticsInfo";
import StatisticsSchedule from "./statisticsSchedule/statisticsSchedule";
import StatisticsForm from "./statisticsForm/statisticsForm";

import {getBotStatistics} from "../../actions/actionCreator";
import {formatDateToUnix} from "../../utils/formatDate";

const StatisticsContainer = ({match, getBotStatistics}) => {
   const [activeTab, setActiveTab] = useState(1);
   const [tabs] = useState([
      {name: 'Все', key: '1'},
      {name: 'Facebook', key: '2'},
      {name: 'Telegram', key: '3'},
      {name: 'ВКонтакте', key: '4'},
      {name: 'WhatsApp', key: '5'},
   ]);

   const changeTab = tabId => setActiveTab(tabId);
   const defaultStartDay = new Date();
   const defaultEndDay = new Date();

   defaultStartDay.setDate(defaultStartDay.getDate() - 1);
   defaultEndDay.setDate(defaultEndDay.getDate() + 6);

   useEffect(() => {
      getBotStatistics({
         botId: match.params.botId,
         startDate: formatDateToUnix(defaultStartDay),
         endDate: formatDateToUnix(defaultEndDay),
      });
   }, []);

   return (
      <div className="statistics-container">
         <div className="pv1-flex pv1-j-sb">
            <StatisticsInfo
               tabs={tabs}
               activeTab={activeTab}
            />
            <StatisticsSchedule
               tabs={tabs}
               defaultStartDay={defaultStartDay}
               defaultEndDay={defaultEndDay}
               changeTab={changeTab}
               activeTab={activeTab}
            />
         </div>
         <StatisticsForm/>
      </div>
   );
};

const mapStateToProps = ({botStatisticsReducer}) => ({
   statistics: botStatisticsReducer.statistics,
   loadingOfStatistics: botStatisticsReducer.loadingOfStatistics,
   errorOfStatistics: botStatisticsReducer.errorOfStatistics
});

const mapDispatchToProps = dispatch => ({
   getBotStatistics: data => dispatch(getBotStatistics(data))
});


export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(StatisticsContainer);
