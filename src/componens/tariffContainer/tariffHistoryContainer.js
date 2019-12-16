import React from 'react';

const TariffHistoryContainer = () => {
   return (
      <div className="main-container tariff-history-container">
         <div className="main-table tariff-history-table">
            <table className="main-table-content">
               <thead className="main-table-content__head">
               <tr>
                  <td>Бот</td>
                  <td>Статус</td>
                  <td>Тариф</td>
               </tr>
               </thead>

               <tbody className="main-table-content__body tariff-table-content__body">
                  <tr>
                     <td/>
                     <td>Нет операций</td>
                     <td/>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default TariffHistoryContainer;