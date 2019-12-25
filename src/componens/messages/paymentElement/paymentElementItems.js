import React, {useState} from "react";

import PaymentTextArea from "./paymentTextArea";
import cloudPayment from '../../../images/payment/Logo_CP.png';
import kaspiGold from '../../../images/payment/Карта_Kaspi_Gold.png';
import example from '../../../images/payment/ввввв.png';
import check from '../../../images/payment/photo_2019-12-15 20.02.21.png';
import arrLeft from '../../../images/payment/arr-left.png';

import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import {Select, Spin} from 'antd';

import {matchNumber} from "../../../utils/textValidation";

const {Option} = Select;

export const Page = ({setPage}) => (
   <div className="payment-card-types pv1-flex pv1-j-sb">
      <div className="payment-card-types__item">
         <img src={cloudPayment} alt="Cloud payments"/>
      </div>

      <div className="payment-card-types__item" onClick={() => setPage(1)}>
         <img src={kaspiGold} alt="Kaspi Gold"/>
      </div>
   </div>
);

export const Page1 = ({
   price, setPrice, page,
   card1, card2, card3, card4,
   setCard1, setCard2, setCard3,
   setCard4, setError, setPage,
   surname, name, patronymic,
   setSurname, setName, setPatronymic
}) => {
   const [cardVisible, setCardVisible] = useState(false);

   const handleChange1 = () => {
      if ((price.length !== 0) && (card1 && card2 && card3 && card4).length === 4) {
         setError('');
         setCardVisible(true);
      } else {
         setError('Данные не верны');
      }
   };

   const handleChange2 = () => {
      if ((surname && name && patronymic).length !== 0) {
         setError('');
         setPage(2);
      } else {
         setError('Данные не верны');
      }
   };

   return (
      <div className="payment-kaspi">
         {!cardVisible ? (
            <div>
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
                     maxLength="4"
                     className="payment-kaspi-card__field"
                     placeholder="5169"
                     value={card1}
                     onChange={e => setCard1(e.target.value)}
                  />
                  <input
                     type="text"
                     onInput={matchNumber}
                     maxLength="4"
                     className="payment-kaspi-card__field"
                     placeholder="0000"
                     value={card2}
                     onChange={e => setCard2(e.target.value)}
                  />
                  <input
                     type="text"
                     onInput={matchNumber}
                     maxLength="4"
                     className="payment-kaspi-card__field"
                     placeholder="0000"
                     value={card3}
                     onChange={e => setCard3(e.target.value)}
                  />
                  <input
                     type="text"
                     onInput={matchNumber}
                     maxLength="4"
                     className="payment-kaspi-card__field"
                     placeholder="1234"
                     value={card4}
                     onChange={e => setCard4(e.target.value)}
                  />
               </div>
            </div>
         ) : (
            <div>
               <p className="payment-steps">
                  ШАГ-2: Напишите ФИО. точно как на вашем удостоверения.
               </p>

               <p className="payment-steps-desc">
                  Внимание! карта и удостоверения должны быть вашим.
               </p>

               <div className="kaspi-full-name">
                  <div className="kaspi-full-name__field">
                     <FormControl fullWidth>
                        <Input
                           id="component-helper"
                           aria-describedby="component-helper-text"
                           placeholder="Жақсынов"
                           value={surname}
                           onChange={e => setSurname(e.target.value)}
                        />
                        <FormHelperText id="component-helper-text">Введите вашу фамилию</FormHelperText>
                     </FormControl>
                  </div>
                  <div className="kaspi-full-name__field">
                     <FormControl fullWidth>
                        <Input
                           id="component-helper"
                           aria-describedby="component-helper-text"
                           placeholder="Елдос"
                           value={name}
                           onChange={e => setName(e.target.value)}
                        />
                        <FormHelperText id="component-helper-text">Введите ваше имя</FormHelperText>
                     </FormControl>
                  </div>
                  <div className="kaspi-full-name__field">
                     <FormControl fullWidth>
                        <Input
                           id="component-helper"
                           placeholder="Қанатұлы"
                           aria-describedby="component-helper-text"
                           value={patronymic}
                           onChange={e => setPatronymic(e.target.value)}
                        />
                        <FormHelperText id="component-helper-text">Введите ваше отчество</FormHelperText>
                     </FormControl>
                  </div>
               </div>
            </div>
         )}

         <Button
            onClick={cardVisible ? handleChange2 : handleChange1}
            className={`payment-btn ${page !== 0 && 'payment-margin'}`}
            variant="contained"
         >
            Далее
         </Button>
      </div>
   );
};

export const Page2 = ({page, setPage}) => {
   const handleChange = () => {
      setPage(3);
   };

   return (
      <div className="payment-info">
         <p className="payment-steps">
            ШАГ-3: Попросите клиенту скинуть скрин фискальный чек.
         </p>

         <div className="payment-info__example pv1-flex pv1-j-sb pv1-flex-align-center">
            <div>
               <img src={example} alt="Пример"/>
            </div>
            <div>
               <img src={arrLeft} alt="Ico"/>
            </div>
            <div>
               <img src={check} alt="Чек"/>
            </div>
         </div>

         <Button
            onClick={handleChange}
            className={`payment-btn ${page !== 0 && 'payment-margin'}`}
            variant="contained"
         >
            Далее
         </Button>
      </div>
   );
};

export const Page3 = props => {
   const {
      page, handleSave, failureAction,
      isFetching, setFailureAction, setSuccessAction,
      successAction, changedScenario, changedTrigger
   } = props;

   function onChange(value) {
      setSuccessAction(value)
   }

   const defaultValue = Object.keys(changedScenario).length !== 0 && changedScenario.triggers.find(data => data.id === successAction);

   return (
      <div className="payment-save">
         <div className="payment-save-container">
            <div className="pv1-flex pv1-j-sb">
               <p className="payment-save-title">При отказет:</p>
               <PaymentTextArea
                  componentType="failure_trigger_text"
                  setFailureAction={setFailureAction}
                  failureAction={failureAction}
                  {...props}
               />
            </div>

            <div className="payment-save-container-success-pay pv1-flex pv1-j-sb">
               <p className="payment-save-title">Успешная оплата:</p>
               <div className="payment-save-selector">
                  <Select
                     showSearch
                     notFoundContent={isFetching ? <Spin size="small" /> : null}
                     style={{width: "100%", borderRadius: '5px !important'}}
                     defaultValue={defaultValue && defaultValue.caption}
                     placeholder="Выбирайте сообщение"
                     optionFilterProp="children"
                     onChange={onChange}
                     filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                     }
                  >
                     {changedScenario.triggers.filter(trigger => trigger.id !== changedTrigger.id).map(data => (
                        <Option value={data.id}>{data.caption}</Option>
                     ))}
                  </Select>

                  <p className="payment-save-selector__desc">
                     Выбирайте сообщение на которое будет перенаправлен
                     пользователь в случае успешной оплаты.
                  </p>
               </div>
            </div>
         </div>

         <Button
            onClick={handleSave}
            className={`payment-btn ${page !== 0 && 'payment-margin'}`}
            variant="contained"
         >
            Сохранить
         </Button>
      </div>
   )
};
