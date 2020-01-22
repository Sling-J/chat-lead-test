import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import Button from "@material-ui/core/Button";
import {Modal} from 'antd';

import TextArea from '../textArea/textArea';
import {Page, Page1, Page2, Page3} from "./paymentElementItems";
import {updateTrigger} from "../../../actions/actionCreator";
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

import style from "../../../styles/messageButtons.module.scss";

const PaymentElement = props => {
   const {
      type, isFetching, changedTrigger,
      index, changedSocial, value
   } = props;

   const [price, setPrice] = useState('');
   const [card1, setCard1] = useState('');
   const [card2, setCard2] = useState('');
   const [card3, setCard3] = useState('');
   const [card4, setCard4] = useState('');

   const [surname, setSurname] = useState('');
   const [name, setName] = useState('');
   const [patronymic, setPatronymic] = useState('');

   const [failureAction, setFailureAction] = useState('');
   const [successAction, setSuccessAction] = useState(null);

   const [error, setError] = useState('');

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

   const handleSave = () => {
      const messagesCopy = changedTrigger.messages;

      if (
         ((price && surname && name && patronymic && failureAction).length !== 0) &&
         ((card1 && card2 && card3 && card4).length === 4) && successAction
      ) {
         setError('');

         messagesCopy[changedSocial][index].amount = price;
         messagesCopy[changedSocial][index].surname = surname;
         messagesCopy[changedSocial][index].name = name;
         messagesCopy[changedSocial][index].patronymic = patronymic;
         messagesCopy[changedSocial][index].recipient_card_info = `${card1}${card2}${card3}${card4}`;
         messagesCopy[changedSocial][index].trigger_id = successAction;
         messagesCopy[changedSocial][index].failure_text = failureAction;

         const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
         };

         props.updateTrigger(triggerData, null, props.changedSocial);
         handleCancel();
      } else {
         setError('Вы заполнили не все данные!');
      }
   };

   const title = page === 0 ? 'Выберите способ приема платежа:' : 'Подключение к платежной системе: KaspiGOLD';

   const footer = (
      <p style={{textAlign: 'center', color: 'tomato'}}>{error}</p>
   );

   useEffect(() => {
      setPrice(value.amount);

      if (value.recipient_card_info === '') {
         setCard1(value.recipient_card_info);
         setCard2(value.recipient_card_info);
         setCard3(value.recipient_card_info);
         setCard4(value.recipient_card_info);
      } else {
         setCard1(value.recipient_card_info.slice(0, 4));
         setCard2(value.recipient_card_info.slice(4, 8));
         setCard3(value.recipient_card_info.slice(8, 12));
         setCard4(value.recipient_card_info.slice(12, 16));
      }

      setSurname(value.surname);
      setName(value.name);
      setPatronymic(value.patronymic);

      setFailureAction(value.failure_text);
      setSuccessAction(value.trigger_id);
   }, []);

   return (
      <div className="paymentMainContainer">
         <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
         <ConditionsContainer conditions={value.conditions}/>

         <TextArea componentType={type} hideCondition timerMargin {...props}/>
         <div className="payment-main-container">
            <p className="payment-main-info">
               Сумма: <span>{price}</span> тг.
            </p>

            <p className="payment-main-info">
               Номер карты: <span>{`${card1} ${card2} ${card3} ${card4}`}</span>
            </p>

            <p className="payment-main-info">
               Владелец карты: <span>{`${surname} ${name} ${patronymic}`}</span>
            </p>
         </div>

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
               footer={footer}
            >
               {page !== 0 && (
                  <div className="payment-navigation">
                     <div className={`payment-navigation__item ${page === 0 && 'payment-navigation-active__item'}`}>
                        <div
                           className="payment-navigation-item__overlay"
                           onClick={() => setPage(0)}
                        />
                     </div>
                     <div className={`payment-navigation__item ${page === 1 && 'payment-navigation-active__item'}`}>
                        <div
                           className="payment-navigation-item__overlay"
                           onClick={() => setPage(1)}
                        />
                     </div>
                     <div className={`payment-navigation__item ${page === 2 && 'payment-navigation-active__item'}`}>
                        <div
                           className="payment-navigation-item__overlay"
                           onClick={() => setPage(2)}
                        />
                     </div>
                     <div className={`payment-navigation__item ${page === 3 && 'payment-navigation-active__item'}`}>
                        <div
                           className="payment-navigation-item__overlay"
                           onClick={() => setPage(3)}
                        />
                     </div>
                  </div>
               )}

               <p className="payment-more-info">
                  <span>Подробная справка</span> по подключению и настройке платежной системы.
               </p>

               <div className={`payment-container ${page === 0 && 'payment-margin'}`}>
                  {
                     page === 0 ?
                        <Page
                           setPage={setPage}
                        /> :
                     page === 1 ?
                        <Page1
                           price={price}
                           setPrice={setPrice}
                           page={page}
                           card1={card1}
                           card2={card2}
                           card3={card3}
                           card4={card4}
                           setError={setError}
                           setCard1={setCard1}
                           setCard2={setCard2}
                           setCard3={setCard3}
                           setCard4={setCard4}
                           setPage={setPage}
                           surname={surname}
                           name={name}
                           patronymic={patronymic}
                           setSurname={setSurname}
                           setName={setName}
                           setPatronymic={setPatronymic}
                        /> :
                     page === 2 ?
                        <Page2
                           page={page}
                           setPage={setPage}
                        /> :
                     page === 3 ?
                        <Page3
                           page={page}
                           setPage={setPage}
                           handleSave={handleSave}
                           isFetching={isFetching}
                           setFailureAction={setFailureAction}
                           setSuccessAction={setSuccessAction}
                           failureAction={failureAction}
                           successAction={successAction}
                           {...props}
                        /> : null
                  }
               </div>
            </Modal>
         </div>
      </div>
   );
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(PaymentElement);
