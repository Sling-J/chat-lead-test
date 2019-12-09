import React, {useState} from 'react';
import {DatePicker, Tabs} from 'antd';

import {dateFormat} from "../../../utils/formatDate";
import Schedule from "./schedule";

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const StatisticsSchedule = ({tabs, changeTab}) => {
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

export default StatisticsSchedule;
