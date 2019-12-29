import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getTransactions} from '../../actions/actionCreator';

const TariffHistoryContainer = ({getTransactions}) => {
   useEffect(() => {
      getTransactions();
   }, []);

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

export default connect(({botPaymentReducer}) => ({
   transactions: botPaymentReducer.transactions,
   loadingOfTransactions: botPaymentReducer.loadingOfTransactions,
   errorOfOfTransactions: botPaymentReducer.errorOfOfTransactions,
}), {
   getTransactions
})(TariffHistoryContainer);