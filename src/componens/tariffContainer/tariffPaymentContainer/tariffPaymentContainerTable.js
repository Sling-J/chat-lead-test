import React, {Fragment, useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";

import {Checkbox, Dropdown, Spin, Modal, Result, Button as AntdButton} from "antd";
import Button from "@material-ui/core/Button";

export const Step1 = ({botsData, onChange, setSteps, checkedList, isFetching, payment}) => (
   <Fragment>
      <div style={{width: '100%'}}>
         <Spin spinning={isFetching}>
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
                     bot.payed_end_date >= 2 ? `Осталось ${bot.payed_end_date} дня.` :
                        bot.payed_end_date === 1 ? `Осталось ${bot.payed_end_date} день.` :
                           bot.payed_end_date === 0 ? 'Пробный период закончился.' : 'Пробный период закончился.';

                  return (
                     <tr key={idx}>
                        <td className="tariff-table-content-body__bot-name">
                           {bot.name}
                        </td>
                        <td className="tariff-table-content-body__paid">
                           {bot.payed ? (
                              <p className="tariff-table-content-body__paid-true">
                                 Оплачен
                                 <span>{paidDay}</span>
                              </p>
                           ) : (
                              <p className="tariff-table-content-body__paid-false">
                                 Не оплачен
                                 <span>{paidDay}</span>
                              </p>
                           )}
                        </td>
                        <td>
                           {bot.payed ? bot.plan || 'Оплачено' : (
                              <Checkbox onChange={e => onChange(e, bot, 'Выберите тариф', idx)}>
                                 Оплатить
                              </Checkbox>
                           )}
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
         </Spin>
      </div>

      <Button
         onClick={() => setSteps(2)}
         disabled={checkedList.length === 0}
         className="tariff-next-btn main-theme-button"
         variant="contained"
         href=""
      >
         Продолжить <FontAwesomeIcon icon={faLongArrowAltRight}/>
      </Button>
   </Fragment>
);


export const Step2 = ({checkedList, setSteps, onChange, visible, setVisible, onOk, payment, loadingOfPayment}) => {
   const [price, setPrice] = useState(0);
   const [standardList] = useState([
      {
         id: 1,
         title: 'За месяц',
         price: '19$ / месяц',
         bonus: '',
         clickedText: 'Стандарт, за месяц',
         clickedPrice: 19,
         clickedPriceText: '19$ за месяц',
         period: 1,
         plan: 'standard',
      },
      {
         id: 2,
         title: 'За год',
         price: '15$ / месяц',
         bonus: 'Выгода -25%',
         clickedText: 'Стандарт, за год',
         clickedPrice: 180,
         clickedPriceText: '15$ в месяц',
         period: 12,
         plan: 'standard',
      },
   ]);
   const [premiumList] = useState([
      {
         id: 1,
         title: 'За месяц',
         price: '49$ / месяц',
         bonus: '',
         clickedText: 'Премиум, за месяц',
         clickedPrice: 49,
         clickedPriceText: '49$ за месяц',
         period: 1,
         plan: 'premium',
      },
      {
         id: 2,
         title: 'За год',
         price: '39$ / месяц',
         bonus: 'Выгода -25%',
         clickedText: 'Премиум, за год',
         clickedPrice: 468,
         clickedPriceText: '39$ в месяц',
         period: 12,
         plan: 'premium',
      },
	]);
	
	useEffect(() => {
		if (Object.keys(payment).length !== 0) {
			handleCancel();
			window.open(payment.payment_link)
		};
	}, [payment]);

   const showModal = price => {
      setPrice(price);
      setVisible(true);
   };

   const handleCancel = () => {
      setVisible(false)
	};

   const disabled = checkedList.filter(item => item.tariff === 'Выберите тариф');

   return (
      <Fragment>
         <table className="main-table-content">
            <thead className="main-table-content__head">
            <tr>
               <td>Бот</td>
               <td>Тариф</td>
               <td>Стоимость</td>
            </tr>
            </thead>

            <tbody className="main-table-content__body tariff-table-content__body">
            {checkedList.length !== 0 ? checkedList.map((bot, idx) => {
               const DropdownItem = (
                  <div className="dropdown-box">
                     <div className="dropdown-box__item">
                        <h2 className="dropdown-box-item__title">Стандарт</h2>
                        <div className="dropdown-box-item__info">
                           {standardList.map((item, index) => (
                              <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, item.clickedText, idx, true, item.clickedPriceText, item.period, item.plan, item.clickedPrice)}>
                                 <p className="dropdown-box-item__desc">{item.title}</p>
                                 <p className="dropdown-box-item__price">{item.price}</p>
                                 <p className="dropdown-box-item__bonus">{item.bonus}</p>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="dropdown-box__item">
                        <h2 className="dropdown-box-item__title">Премиум</h2>

                        <div className="dropdown-box-item__info">
                           {premiumList.map((item, index) => (
                              <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, item.clickedText, idx, true, item.clickedPriceText, item.period, item.plan, item.clickedPrice)}>
                                 <p className="dropdown-box-item__desc">{item.title}</p>
                                 <p className="dropdown-box-item__price">{item.price}</p>
                                 <p className="dropdown-box-item__bonus">{item.bonus}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               );

               return (
                  <tr key={idx}>
                     <td className="tariff-table-content-body__bot-name">
                        {bot.name}
                     </td>
                     <td>
                        <Dropdown overlay={DropdownItem} trigger={['click']}>
                           <p className="tariff-table-content-body__select">
                              {bot.tariff}
                           </p>
                        </Dropdown>
                     </td>
                     <td>
                        {bot.price}
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
            </tbody>
         </table>

         <div className="tariff-payment-footer pv1-flex pv1-j-fd">
            <Button
               onClick={() => {
                  const price = checkedList.reduce((prev, cur) => prev + cur.totalPrice, 0);

                  setSteps(3);
                  showModal(price)
               }}
               disabled={disabled.length}
               className="tariff-next-btn main-theme-button tariff-payment-footer-btn"
               variant="contained"
               href=""
            >
               Открыть окно оплаты
            </Button>
         </div>

         <Modal
            title={null}
            wrapClassName="tariff-payment-modal"
            okText="Оплатить"
            visible={visible}
            onOk={onOk}
            onCancel={handleCancel}
            footer={null}
         >
            <div className="tariff-payment-modal-container">
					<h2>{`Общая сумма оплаты ${price}$`}</h2>
					<p>Для произведения оплаты нажмите <span>оплатить</span></p>

					<div className="tariff-payment-modal-container__buttons">
						<AntdButton key="cancel" onClick={handleCancel}>Отмена</AntdButton>
						<AntdButton type="primary" key="buy" onClick={onOk} loading={loadingOfPayment}>Оплатить</AntdButton>
					</div>
				</div>
         </Modal>
      </Fragment>
   );
};
