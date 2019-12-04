import React, {useState} from 'react';
import {Line} from 'react-chartjs-2'

const StatisticsSchedule = () => {
   const [chartData] = useState({
      labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'],
      datasets: [{
         label: 'Population',
         data: [
            302152,
            181045,
            153060,
            106519,
            105162
         ],
         backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
         ]
      }]
   });

   return (
      <div className="statistics-schedule">
         <div className="chart">
            <Line
               data={chartData}
               options={{
                  title: {
                     display: true,
                     text: 'Largest Cities In Massachusetts',
                     fontSize: 25
                  },
                  legend: {
                     display: true,
                  }
               }}
            />
         </div>
      </div>
   )
};

export default StatisticsSchedule;
