import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {DatePicker, Tabs} from 'antd';

import {dateFormat, formatDateToUnix} from "../../../utils/formatDate";
import Schedule from "./schedule";
import {getBotStatistics} from "../../../actions/actionCreator";
import moment from "moment";

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const StatisticsSchedule = ({tabs, changeTab, getBotStatistics, match, statistics, activeTab}) => {
   let [startDate, setStartDate] = useState(null);
   const [endDate, setEndDate] = useState(null);
   const [dateArr, setDateArr] = useState([]);
   const [chartData, setChartData] = useState(defaultData());

   const arr = [];

   useEffect(() => {
      if (startDate && endDate) {
         // for (let i = startDate; i <= endDate; i ++) {
         //    console.log(i)
         // }
      }
   }, [startDate, endDate]);

   console.log(arr);

   const today = new Date();
   const yesterday = new Date();

   yesterday.setDate(yesterday.getDate() - 1);

   useEffect(() => {
      getBotStatistics({
         botId: match.params.botId,
         startDate: formatDateToUnix(yesterday),
         endDate: formatDateToUnix(today),
      });
   }, []);

   function defaultData(data, date) {
      return {
         labels: date || [
            '1 май', '2 май', '3 май',
            '4 май', '5 май', '6 май',
            '7 май', '8 май', '9 май',
         ],
         datasets: [{
            label: 'Подписчиков',
            borderColor: '#0C9B00',
            fill: false,
            data: [
               1, 3, 6,
               7, 3, 5,
               7, 13, 25
            ]
         }]
      }
   }

   useEffect(() => {
      if (Object.keys(statistics).length !== 0) {
         switch (activeTab) {
            case 0:
               setChartData(defaultData());
               break;

            case 1:
               setChartData(defaultData(statistics.facebook.subscribe_by_day));
               break;

            case 2:
               setChartData(defaultData(statistics.telegram.subscribe_by_day));
               break;

            case 3:
               setChartData(defaultData(statistics.vk.subscribe_by_day));
               break;

            case 4:
               setChartData(defaultData(statistics.whatsapp.subscribe_by_day));
               break;

            default:
               setChartData(defaultData());
         }
      }
   }, [statistics, activeTab]);

   const datePicker = (
      <RangePicker
         format={dateFormat}
         defaultValue={[moment(yesterday, dateFormat), moment(today, dateFormat)]}
         onChange={(value, dateStrings) => {
            let startDate = value[0];
            let endDate = value[1];

            console.log(startDate.date());
            console.log(endDate);

            // setStartDate(startDate);
            // setEndDate(endDate);

            getBotStatistics({
               botId: match.params.botId,
               startDate: value[0].unix(),
               endDate: value[1].unix(),
            });
         }}
      />
   );

   return (
      <div className="statistics-schedule">
         <div className="chart">
            <Tabs defaultActiveKey="2" tabBarExtraContent={datePicker} onChange={activeKey => changeTab(activeKey - 1)}>
               {tabs.map(tab => (
                  <TabPane tab={tab.name} key={tab.key}>
                     <Schedule chartData={chartData}/>
                  </TabPane>
               ))}
            </Tabs>
         </div>
      </div>
   )
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
)(StatisticsSchedule);
