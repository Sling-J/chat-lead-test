import React from 'react';
import {Line} from "react-chartjs-2";

const Schedule = ({chartData}) => {
   return (
      <div>
         <Line
            data={chartData}
            options={{
               legend: {
                  display: false,
               },
               scales: {
                  yAxes: [{
                     ticks: {
                        suggestedMin: 0,
                        suggestedMax: 10
                     }
                  }]
               },
            }}
         />
      </div>
   );
};

export default Schedule;
