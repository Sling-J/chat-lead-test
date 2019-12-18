import React, {useState} from 'react';

import Button from "@material-ui/core/Button";
import {Modal} from 'antd';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import TextArea from '../textArea/textArea';

import cloudPayment from '../../../images/payment/Logo_CP.png';
import kaspiGold from '../../../images/payment/Карта_Kaspi_Gold.png';
import style from "../../../styles/messageButtons.module.scss";

const PaymentElement = props => {
   const {type} = props;

   const [visible, setVisible] = useState('');
   const [page, setPage] = useState(0);

   const showModal = () => {
      setVisible(true)
   };

   const handleOk = e => {
      setVisible(false)
   };

   const handleCancel = e => {
      setVisible(false)
   };

   return (
      <div>
         <TextArea componentType={type} {...props}/>
         <div className={style.keyboardButtonsContainer}>
            {/*<Button className={`${style.keyboardButton}`} href="">*/}
            {/*   <p className={style.keyboardButtonText}>Оплатить</p>*/}
            {/*   <p className={style.keyboardButtonIcon}>*/}
            {/*      <FontAwesomeIcon icon={faPencilAlt}/>*/}
            {/*   </p>*/}
            {/*</Button>*/}
            <Button
               className={style.appendKeyboardButton}
               style={{color: 'tomato'}}
               href=""
               onClick={showModal}
            >
               Настроить платежи
            </Button>
            <Modal
               title="Выберите способ приема платежа:"
               visible={visible}
               onOk={handleOk}
               onCancel={handleCancel}
               footer={page === 0 && null}
            >
               <p className="payment-more-info">
                  <span>Подробная справка</span> по подключению и настройке платежной системы.
               </p>

               <div className="payment-card-types pv1-flex pv1-j-sb">
                  <div className="payment-card-types__item">
                     <img src={cloudPayment} alt="Cloud payments"/>
                  </div>

                  <div className="payment-card-types__item">
                     <img src={kaspiGold} alt="Kaspi Gold"/>
                  </div>
               </div>
            </Modal>
         </div>
      </div>
   );
};

export default PaymentElement;