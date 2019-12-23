import React, {useState} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import {Step1, Step2} from './tariffPaymentContainerTable';
import tariffImg from '../../../images/tariff/tariff-baks.png'

const TariffPaymentContainer = ({botsData}) => {
   const [checkedList, setCheckedList] = useState([]);
   const [steps, setSteps] = useState(1);

   function onChange(e, bot, tariff, idx, isCheck, price) {
      if (e.target.checked) {
         setCheckedList([
            ...checkedList,
            {
               bot_id: bot.id,
               name: bot.name,
               tariff: tariff,
               price: '-',
            }
         ])
      } else if (isCheck) {
         const checkedListCopy = checkedList;
         checkedListCopy[idx].tariff = tariff;
         checkedListCopy[idx].price = price;
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
                  <span className={`${steps === 1 ? 'tariff-table__desc__span' : 'tariff-table__desc__link'}`} onClick={() => steps !== 1 && setSteps(1)}>Выбор бота</span> → {' '}
                  <span className={`${steps === 2 && 'tariff-table__desc__span'}`}>Выбор тарифа</span> → {' '}
                  <span className={`${steps === 3 && 'tariff-table__desc__span'}`}>Оплата</span>
               </p>
            </div>

            {steps === 1 ? (
               <Step1
                  onChange={onChange}
                  botsData={botsData}
                  setSteps={setSteps}
                  checkedList={checkedList}
               />
            ) : (
               <Step2
                  onChange={onChange}
                  setSteps={setSteps}
                  checkedList={checkedList}
               />
            )}
         </div>
      </div>
   );
};

export default connect(({botsReducers}) => ({
   botsData: botsReducers.botsData
}))(TariffPaymentContainer);
