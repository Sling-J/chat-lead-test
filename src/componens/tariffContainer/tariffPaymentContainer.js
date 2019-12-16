import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button'

import tariffImg from '../../images/tariff/tariff-baks.png'

const TariffPaymentContainer = ({botsData}) => {
   return (
      <div className="main-container tariff-container pv1-flex pv1-j-sb">
         <div className="tariff__balance">
            <div className="tariff-balance__box pv1-flex pv1-flex-align-center">
               <div className="tariff-balance-box__img">
                  <img src={tariffImg} alt="Money"/>
               </div>
               
               <div className="tariff-balance-box__info">
                  <h3 className="tariff-balance-box-info__title">Ваш баланс:</h3>
                  <p className="tariff-balance-box-info__desc">0 тг</p>
               </div>
            </div>

            <Button className="tariff-balance__btn main-theme-button" variant="contained" href="">
               Оплатить тариф
            </Button>
         </div>

         <div className="main-table tariff__table">
            <div className="main-table__search">
               <h2 className="main-table__title tariff-table__title">Шаг 1 из 3</h2>
               <p className="main-table__desc tariff-table__desc">
                  <span>Выбор бота</span>  → Выбор тарифа  → Оплата
               </p>
            </div>
            <table className="main-table-content">
               <thead className="main-table-content__head">
               <tr>
                  <td>Бот</td>
                  <td>Статус</td>
                  <td>Тариф</td>
               </tr>
               </thead>

               <tbody className="main-table-content__body tariff-table-content__body">
                  {botsData.length !== 0 ? botsData.map((bot, idx) => {
                     const paidDay = bot.payed_end_date >= 5 ? `Осталось ${bot.payed_end_date} дней.` :
                        bot.payed_end_date >= 2 ? `Осталось ${bot.payed_end_date} дня.`  :
                           bot.payed_end_date === 1 ? `Осталось ${bot.payed_end_date} день.`  :
                              bot.payed_end_date === 0 ? 'Пробный период закончился.' : 'Пробный период закончился.';

                     return (
                        <tr key={idx}>
                           <td>
                              {bot.name}
                           </td>
                           <td className="tariff-table-content-body__paid">
                              {bot.payed ? (
                                 <p>
                                    Оплачен
                                    <span> до 25 июля 2019</span>
                                 </p>
                              ) : (
                                 <p>
                                    Не оплачен
                                    <span>{paidDay}</span>
                                 </p>
                              )}
                           </td>
                           <td>
                              Бесплатный
                           </td>
                        </tr>
                     )
                  }) : (
                     <tr>
                        <td>Ничего не найдено</td>
                        <td/>
                        <td/>
                     </tr>
                  )}
                  <tr className="tariff-table-content-body__bot">
                     <td>
                        <Link className="tariff-table-content-body-bot__link" to="/bots">
                           <FontAwesomeIcon icon={faPlusCircle}/>
                           <span>Добавить нового бота</span>
                        </Link>
                     </td>
                     <td/>
                     <td/>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default connect(({botsReducers}) => ({
   botsData: botsReducers.botsData
}))(TariffPaymentContainer);
