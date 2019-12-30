import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {getTransactions} from '../../actions/actionCreator';

import {Spin} from 'antd';
import {formatUnixToDate} from "../../utils/formatDate";

const TariffHistoryContainer = ({getTransactions, loadingOfTransactions, transactions, botsData}) => {
   useEffect(() => {
      getTransactions();
   }, []);

   return (
      <div className="main-container tariff-history-container">
         <Spin spinning={loadingOfTransactions}>
            <div className="main-table tariff-history-table">
               <table className="main-table-content">
                  <thead className="main-table-content__head">
                  <tr>
                     <td>Бот</td>
                     <td>Тариф</td>
                     <td>Период оплаты</td>
                     <td>Дата оплаты</td>
                  </tr>
                  </thead>

                  <tbody className="main-table-content__body tariff-table-content__body">
                  {transactions.length !== 0 ? transactions.map(item => {
                     const botName = botsData.find(bot => bot.id === item.bot_id);

                     return (
                        <tr>
                           <td className="tariff-table-content-body__bot-name">{botName && botName.name}</td>
                           <td>{item.plan === 'standard' ? 'Стандарт' : 'Премиум'}</td>
                           <td>{item.period === 1 ? 'За один месяц' : 'На год'}</td>
                           <td>{formatUnixToDate(item.date)}</td>
                        </tr>
                     )
                  }) : (
                     <tr>
                        <td/>
                        <td>Нет операций</td>
                        <td/>
                        <td/>
                     </tr>
                  )}
                  </tbody>
               </table>
            </div>
         </Spin>
      </div>
   );
};

export default connect(({botPaymentReducer, botsReducers}) => ({
   transactions: botPaymentReducer.transactions,
   loadingOfTransactions: botPaymentReducer.loadingOfTransactions,
   errorOfOfTransactions: botPaymentReducer.errorOfOfTransactions,
   botsData: botsReducers.botsData
}), {
   getTransactions
})(TariffHistoryContainer);
