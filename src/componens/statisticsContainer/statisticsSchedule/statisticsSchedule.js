import React, {useState} from 'react';
import {DatePicker, Tabs} from 'antd';
import moment from 'moment';

import {dateFormat} from "../../../utils/formatDate";
import Schedule from "./schedule";

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const StatisticsSchedule = () => {
   const [chartData] = useState({
      labels: [
         '20 май', '21 май', '22 май',
         '23 май', '24 май', '25 май',
         '26 май', '27 май', '28 май',
         '29 май', '30 май', '31 май'
      ],
      datasets: [{
         label: 'Подписчиков',
         borderColor: '#0C9B00',
         fill: false,
         data: [
            1, 2, 3,
            4, 7, 5,
            12, 16, 13,
            19, 17, 22
         ]
      }]
   });

   const datePicker = (
      <RangePicker
         onChange={(value, dateStrings) => {
            console.log(value[1].unix() - value[0].unix())
         }}
         format={dateFormat}
      />
   );

   return (
      <div className="statistics-schedule">
         <div className="chart">
            <div>
               <Tabs defaultActiveKey="1" tabBarExtraContent={datePicker}>
                  <TabPane tab="Все" key="1">
                     <Schedule chartData={chartData}/>
                  </TabPane>
                  <TabPane tab="Facebook" key="2">
                     <Schedule chartData={chartData}/>
                  </TabPane>
                  <TabPane tab="Telegram" key="3">
                     <Schedule chartData={chartData}/>
                  </TabPane>
                  <TabPane tab="Vk" key="4">
                     <Schedule chartData={chartData}/>
                  </TabPane>
                  <TabPane tab="WhatsApp" key="5">
                     <Schedule chartData={chartData}/>
                  </TabPane>
               </Tabs>
            </div>
         </div>
      </div>
   )
};

export default StatisticsSchedule;
