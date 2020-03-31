import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {Button as AntdButton, Collapse, Modal, Result, notification} from "antd";
import {addMoney, moduleName as partnersModule, refreshMoneyAddingStatus} from "../../ducks/Partners";

import {matchNumber} from "../../utils/textValidation";

const {Panel} = Collapse;

const PartnersMineModal = props => {
   const {
      moneyAddingSuccess, modalVisibility, setModalVisibility,
      loadingOfMoneyAdding, errorOfMoneyAdding, addMoney,
      refreshMoneyAddingStatus
   } = props;

   const [activeCollapse, setActiveCollapse] = useState(undefined);

   const [modalError, setModalError] = useState('');
   const [amount, setAmount] = useState('');
   const [card, setCard] = useState('');

   useEffect(() => {
      if (errorOfMoneyAdding) {
         setModalError(errorOfMoneyAdding);
      }
   }, [errorOfMoneyAdding]);

   const handleCancel = () => {
      setModalVisibility(false);
      refreshMoneyAddingStatus();
   };

   const collapseChanging = key => {
      setActiveCollapse(key);
      setModalError('');
      setAmount('');
      setCard('');
   };

   const handleOk = () => {
      if (activeCollapse === '1') {
         if (amount.length !== 0 && card.length !== 0) {
            addMoney({
               amount: amount,
               card: card,
               method: 'yandex'
            });
         } else {
            setModalError('Заполните обязательные поля!');
         }
      } else if (activeCollapse === '2') {
         if (amount.length !== 0 && card.length !== 0) {
            addMoney({
               amount: amount,
               card: card,
               method: 'card'
            });
         } else {
            setModalError('Заполните обязательные поля!');
         }
      } else {
         notification['warning']({
            message: 'Выберите способ выплаты!',
            description: 'Вы можете оплатить свой тариф в Chatlead.io или сделать выплату двумя способами: Заказать на «Яндекс деньги», Заказать на «Банковскую карту»',
         });
      }
   };

   return (
      <Modal
         title={`${!moneyAddingSuccess ? 'Выберите способ выплаты:' : ''}`}
         wrapClassName={`partners-mine-container__modal ${activeCollapse === '1' ? 'partners-mine-container__modal-1' : activeCollapse === '2' ? 'partners-mine-container__modal-2' : ''}`}
         visible={modalVisibility}
         onOk={handleOk}
         onCancel={handleCancel}
         footer={!moneyAddingSuccess && [
            <AntdButton key="back" onClick={handleCancel}>
               Отмена
            </AntdButton>,
            <AntdButton key="submit" type="primary" loading={loadingOfMoneyAdding} onClick={handleOk}>
               Оплатить
            </AntdButton>,
         ]}
         okText="Оплатить"
      >
         {moneyAddingSuccess ? (
            <Result
               status="success"
               title="Ваша выплата в обработке!"
               subTitle="В течение 3 рабочих дней деньги поступят на ваш счет."
            />
         ) : (
            <Fragment>
               <a
                  href="https://my.chatlead.io/bots/tariff/prices"
                  target="_blank"
                  className="partners-mine-container-modal__text"
               >
                  Оплатить свой тариф в «Chatlead.io»
                  <span/>
               </a>
               <Collapse accordion onChange={collapseChanging}>
                  <Panel showArrow={false} header="Заказать выплату на «Яндекс деньги»" key="1">
                     <div className="partners-mine-container-modal__field">
                        <input
                           type="text"
                           placeholder="100$"
                           value={amount}
                           onInput={matchNumber}
                           onChange={e => setAmount(e.target.value)}
                        />
                        <p className="partners-mine-container-modal-field__decs">
                           Напишите сумму выплаты.
                        </p>
                     </div>

                     <div className="partners-mine-container-modal__field">
                        <input
                           type="text"
                           placeholder="4100110468707859"
                           value={card}
                           onInput={matchNumber}
                           onChange={e => setCard(e.target.value)}
                        />
                        <p className="partners-mine-container-modal-field__decs">
                           Напишите номер счета.
                        </p>
                     </div>

                     <p className="partners-mine-container-modal__error">{modalError}</p>
                  </Panel>
                  <Panel showArrow={false} header="Заказать выплату на «Банковскую карту»" key="2">
                     <div className="partners-mine-container-modal__field">
                        <input
                           type="text"
                           placeholder="100$"
                           value={amount}
                           onInput={matchNumber}
                           onChange={e => setAmount(e.target.value)}
                        />
                        <p className="partners-mine-container-modal-field__decs">Напишите сумму выплаты.</p>
                     </div>

                     <div className="partners-mine-container-modal__field">
                        <input
                           type="text"
                           placeholder="5169 4931 3557 9897"
                           value={card}
                           onInput={matchNumber}
                           onChange={e => setCard(e.target.value)}
                        />
                        <p className="partners-mine-container-modal-field__decs">Напишите номер счета.</p>
                     </div>

                     <p className="partners-mine-container-modal__error">{modalError}</p>
                  </Panel>
               </Collapse>
            </Fragment>
         )}
      </Modal>
   );
};

const mapStateToProps = state => ({
   moneyAddingSuccess: state[partnersModule].moneyAddingSuccess,
   errorOfMoneyAdding: state[partnersModule].errorOfMoneyAdding,
   loadingOfMoneyAdding: state[partnersModule].loadingOfMoneyAdding,
});

const mapDispatchToProps = dispatch => ({
   refreshMoneyAddingStatus: () => dispatch(refreshMoneyAddingStatus()),
   addMoney: data => dispatch(addMoney(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnersMineModal);