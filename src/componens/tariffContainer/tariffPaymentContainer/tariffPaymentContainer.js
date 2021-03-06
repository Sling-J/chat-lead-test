import React, {useState} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';

import tariffImg from '../../../images/tariff/tariff-baks.png'
import {Step1, Step2} from './tariffPaymentContainerTable';
import {moduleName as paymentModule, addPayment} from "../../../ducks/Payment";

const TariffPaymentContainer = ({botsData, addPayment, isFetching, payment, loadingOfPayment}) => {
   const [checkedList, setCheckedList] = useState([]);
   const [steps, setSteps] = useState(1);
   const [visible, setVisible] = useState(false);

   function onOk() {
      let bots = [];

      checkedList.forEach(item => bots.push({
         bot_id: item.bot_id,
         period: item.period,
         plan: item.plan,
      }));

      addPayment(bots);
   }

   function onChange(e, bot, tariff, idx, isCheck, price, period, plan, clickedPrice) {
      if (e.target.checked) {
         setCheckedList([
            ...checkedList,
            {
               bot_id: bot.id,
               name: bot.name,
               tariff: tariff || '',
               period: period || '',
               plan: plan || '',
               totalPrice: clickedPrice || 0
            }
         ])
      } else if (isCheck) {
         const checkedListCopy = checkedList;
         checkedListCopy[idx].tariff = tariff;
         checkedListCopy[idx].price = price;
         checkedListCopy[idx].period = period;
         checkedListCopy[idx].plan = plan;
         checkedListCopy[idx].totalPrice = clickedPrice;

         setCheckedList([...checkedListCopy]);
      } else {
         const newCheckedList = checkedList.filter(item => item.bot_id !== bot.id);
         setCheckedList(newCheckedList);
      }
   }

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
                  <span
                     className={`${steps === 1 && 'tariff-table__desc__span'} ${steps === 2 && 'tariff-table__desc__link'}`}
                     onClick={() => {
                        setCheckedList([]);
                        steps === 2 && setSteps(1)
                     }}
                  >
                     Выбор бота
                  </span> → {' '}

                  <span
                     className={`${steps === 2 && 'tariff-table__desc__span'} ${steps === 3 && 'tariff-table__desc__link'}`}
                     onClick={() => steps === 3 && setSteps(2)}
                  >
                     Выбор тарифа
                  </span> → {' '}

                  <span className={`${steps === 3 && 'tariff-table__desc__span'}`}>Оплата</span>
               </p>
            </div>

            {steps === 1 ? (
               <Step1
                  onChange={onChange}
                  botsData={botsData}
                  setSteps={setSteps}
                  checkedList={checkedList}
                  isFetching={isFetching}
               />
            ) : (
               <Step2
                  onChange={onChange}
                  setSteps={setSteps}
                  checkedList={checkedList}
                  isFetching={isFetching}
                  visible={visible}
                  setVisible={setVisible}
                  loadingOfPayment={loadingOfPayment}
                  payment={payment}
                  onOk={onOk}
               />
            )}
         </div>
      </div>
   );
};

export default connect(state => ({
   botsData: state.botsReducers.botsData,
   isFetching: state.botsReducers.isFetching,
   payment: state[paymentModule].payment,
   loadingOfPayment: state[paymentModule].loadingOfPayment,
   errorOfPayment: state[paymentModule].errorOfPayment,
}), {
   addPayment
})(TariffPaymentContainer);
