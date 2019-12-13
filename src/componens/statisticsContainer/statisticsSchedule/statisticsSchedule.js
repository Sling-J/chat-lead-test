import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {DatePicker, Tabs} from 'antd';

import {dateFormat, formatDateToUnix} from "../../../utils/formatDate";
import Schedule from "./schedule";
import {getBotStatistics} from "../../../actions/actionCreator";

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const StatisticsSchedule = ({tabs, changeTab, getBotStatistics, match}) => {
   const [chartData] = useState({
      labels: [
         '1 май', '2 май', '3 май',
         '4 май', '5 май', '6 май',
         '7 май', '8 май', '9 май',
      ],
      datasets: [{
         label: 'Подписчиков',
         borderColor: '#0C9B00',
         fill: false,
         data: [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
         ]
      }]
   });

   useEffect(() => {
      const today = formatDateToUnix(new Date());
      const yesterday = new Date();

      yesterday.setDate(yesterday.getDate() - 1);

      getBotStatistics({
         botId: match.params.botId,
         startDate: formatDateToUnix(yesterday),
         endDate: today,
      });
   }, []);

   const datePicker = (
      <RangePicker
         disabled
         format={dateFormat}
         onChange={(value, dateStrings) => {
            console.log(value[1].unix() - value[0].unix())
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

const mapDispatchToProps = dispatch => ({
   getBotStatistics: data => dispatch(getBotStatistics(data))
});


export default compose(
   withRouter,
   connect(null, mapDispatchToProps)
)(StatisticsSchedule);
