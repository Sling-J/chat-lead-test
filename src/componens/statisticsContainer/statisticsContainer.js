import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import StatisticsInfo from "./statisticsInfo/statisticsInfo";
import StatisticsSchedule from "./statisticsSchedule/statisticsSchedule";
import StatisticsTag from "./statisticsTag/statisticsTag";
import StatisticsForm from "./statisticsForm/statisticsForm";

import {moduleName as statisticsModule, getBotStatistics} from "../../ducks/Statistics";
import {getTags, getTagsStatistics} from "../../ducks/Tags";

import {formatDateToUnix} from "../../utils/formatDate";

const StatisticsContainer = ({match, getBotStatistics, getTags, getTagsStatistics}) => {
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

   defaultStartDay.setDate(defaultStartDay.getDate() - 6);
   defaultEndDay.setDate(defaultEndDay.getDate());

   useEffect(() => {
      getTags(match.params.botId);
      getTagsStatistics(match.params.botId);
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
         <StatisticsTag/>
         <StatisticsForm/>
      </div>
   );
};

const mapStateToProps = state => ({
   statistics: state[statisticsModule].statistics,
   loadingOfStatistics: state[statisticsModule].loadingOfStatistics,
   errorOfStatistics: state[statisticsModule].errorOfStatistics
});

const mapDispatchToProps = dispatch => ({
   getBotStatistics: data => dispatch(getBotStatistics(data)),
   getTagsStatistics: botId => dispatch(getTagsStatistics(botId)),
   getTags: botId => dispatch(getTags(botId)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(StatisticsContainer);
