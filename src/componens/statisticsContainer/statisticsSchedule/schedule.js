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
            }}
         />
      </div>
   );
};

export default Schedule;
