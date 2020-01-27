import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {DatePicker, Tabs, Spin} from 'antd';

import {dateFormat, formatUnixToDate} from "../../../utils/formatDate";
import {moduleName as statisticsModule, getBotStatistics} from "../../../ducks/Statistics";

import Schedule from "./schedule";
import moment from "moment";

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const StatisticsSchedule = ({
   tabs, changeTab, getBotStatistics, loadingOfStatistics,
   match, statistics, activeTab, defaultStartDay, defaultEndDay
}) => {
   const [chartData, setChartData] = useState(defaultData());

   function defaultData(data, date, color, label) {
      return {
         labels: date && date.length !== 0 ? date : [
            '0',
         ],
         datasets: [{
            label: label || 'Загрузка...',
            borderColor: color,
            fill: false,
            data: data && data.length !== 0 ? data : [
               0
            ]
         }]
      }
   }

   function defaultAllData(fb, tg, vk, wp, date) {
      return {
         labels: date && date.length !== 0 ? date : [
            '0',
         ],
         datasets: [
            {
               label: 'Facebook',
               borderColor: '#8B4A8C',
               fill: false,
               data: fb && fb.length !== 0 ? fb : [
                  0
               ]
            },
            {
               label: 'Telegram',
               borderColor: '#F4837D',
               fill: false,
               data: tg && tg.length !== 0 ? tg : [
                  0
               ]
            },
            {
               label: 'ВКонтакте',
               borderColor: '#4C75A3',
               fill: false,
               data: vk && vk.length !== 0 ? vk : [
                  0
               ]
            },
            {
               label: 'WhatsApp',
               borderColor: '#06D755',
               fill: false,
               data: wp && wp.length !== 0 ? wp : [
                  0
               ]
            }
         ]
      }
   }

   useEffect(() => {
      if (Object.keys(statistics).length !== 0) {
         let daysArr = [];

         statistics.days.forEach(day => {
            daysArr.push(formatUnixToDate(day))
         });

         switch (activeTab) {
            case 0:
               setChartData(defaultAllData(
                  statistics.facebook.subscribe_by_day,
                  statistics.telegram.subscribe_by_day,
                  statistics.vk.subscribe_by_day,
                  statistics.whatsapp.subscribe_by_day,
                  daysArr
               ));
               break;

            case 1:
               setChartData(defaultData(statistics.facebook.subscribe_by_day, daysArr, '#8B4A8C', 'Facebook'));
               break;

            case 2:
               setChartData(defaultData(statistics.telegram.subscribe_by_day, daysArr, '#F4837D', 'Telegram'));
               break;

            case 3:
               setChartData(defaultData(statistics.vk.subscribe_by_day, daysArr, '#4C75A3', 'ВКонаткте'));
               break;

            case 4:
               setChartData(defaultData(statistics.whatsapp.subscribe_by_day, daysArr, '#06D755', 'WhatsApp'));
               break;

            default:
               setChartData(defaultData());
         }
      }
   }, [statistics, activeTab]);

   const datePicker = (
      <RangePicker
         format={dateFormat}
         disabled={Object.values(statistics).length === 0 || loadingOfStatistics}
         disabledDate={current => current && current > moment().endOf('day')}
         defaultValue={[moment(defaultStartDay, dateFormat), moment(defaultEndDay, dateFormat)]}
         onChange={(value) => {
            getBotStatistics({
               botId: match.params.botId,
               startDate: value.length !== 0 ? value[0].unix() : defaultStartDay,
               endDate: value.length !== 0 ? value[1].unix() : defaultEndDay,
            });
         }}
      />
   );

   return (
      <div className="statistics-schedule">
         <div className="chart">
            <Spin spinning={loadingOfStatistics}>
               <Tabs defaultActiveKey="2" tabBarExtraContent={datePicker} onChange={activeKey => changeTab(activeKey - 1)}>
                  {tabs.map(tab => (
                     <TabPane tab={tab.name} key={tab.key}>
                        <Schedule chartData={chartData}/>
                     </TabPane>
                  ))}
               </Tabs>
            </Spin>
         </div>
      </div>
   )
};

const mapStateToProps = state => ({
   statistics: state[statisticsModule].statistics,
   loadingOfStatistics: state[statisticsModule].loadingOfStatistics,
   errorOfStatistics: state[statisticsModule].errorOfStatistics
});

const mapDispatchToProps = dispatch => ({
   getBotStatistics: data => dispatch(getBotStatistics(data))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(StatisticsSchedule);
