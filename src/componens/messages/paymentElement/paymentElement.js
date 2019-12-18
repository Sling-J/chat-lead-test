import React, {useState} from 'react';

import Button from "@material-ui/core/Button";
import {Modal} from 'antd';

import TextArea from '../textArea/textArea';

import cloudPayment from '../../../images/payment/Logo_CP.png';
import kaspiGold from '../../../images/payment/Карта_Kaspi_Gold.png';
import style from "../../../styles/messageButtons.module.scss";

import {matchNumber} from "../../../utils/textValidation";

const Page0 = ({setPage}) => (
   <div className="payment-card-types pv1-flex pv1-j-sb">
      <div className="payment-card-types__item">
         <img src={cloudPayment} alt="Cloud payments"/>
      </div>

      <div className="payment-card-types__item" onClick={() => setPage(1)}>
         <img src={kaspiGold} alt="Kaspi Gold"/>
      </div>
   </div>
);

const Page1 = ({price, setPrice}) => (
   <div className="payment-kaspi">
      <p className="payment-steps">
         ШАГ-1: Напишите Сумму оплаты в тенге и Номер
         карты Kaspi GOLD
      </p>

      <p className="payment-kaspi__price">
         Сумма: <input
            type="text"
            className="payment-kaspi-price__input"
            onInput={matchNumber}
            value={price}
            onChange={e => setPrice(e.target.value)}
         /> тг.
      </p>

      <div className="payment-kaspi__card">
         <input
            type="text"
            onInput={matchNumber}
            className="payment-kaspi-card__field"
            placeholder="5169 0000 0000 1234"
         />
      </div>
   </div>
);

const PaymentElement = props => {
   const {type} = props;

   const [price, setPrice] = useState('');
   const [visible, setVisible] = useState(false);
   const [page, setPage] = useState(0);

   const showModal = () => {
      setVisible(true)
   };

   const handleOk = () => {
      setVisible(false)
   };

   const handleCancel = () => {
      setVisible(false)
   };


   const Footer = (
      <Button className={`payment-btn ${page !== 0 && 'payment-margin'}`} variant="contained">Далее</Button>
   );

   const title = page === 0 ? 'Выберите способ приема платежа:' : 'Подключение к платежной системе: KaspiGOLD';

   return (
      <div>
         <TextArea componentType={type} {...props}/>
         <div className={style.keyboardButtonsContainer}>
            <Button
               className={style.appendKeyboardButton}
               style={{color: 'tomato'}}
               href=""
               onClick={showModal}
            >
               Настроить платежи
            </Button>
            <Modal
               title={title}
               visible={visible}
               onOk={handleOk}
               onCancel={handleCancel}
               footer={page === 0 ? null : Footer}
            >
               <p className="payment-more-info">
                  <span>Подробная справка</span> по подключению и настройке платежной системы.
               </p>

               <div className={`payment-container ${page === 0 && 'payment-margin'}`}>
                  {page === 0 ? <Page0 setPage={setPage}/> :
                     page === 1 ? <Page1 price={price} setPrice={setPrice}/> : null}
               </div>
            </Modal>
         </div>
      </div>
   );
};

export default PaymentElement;
