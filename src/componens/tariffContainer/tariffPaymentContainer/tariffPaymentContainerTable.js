import React, {Fragment} from 'react';
import {Checkbox, Dropdown} from "antd";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";

export const Step1 = ({botsData, onChange, setSteps, checkedList}) => (
   <Fragment>
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
                        <Checkbox onChange={e => onChange(e, bot, 'Выберите тариф', idx)}>
                           Стандарт
                        </Checkbox>
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


export const Step2 = ({checkedList, setSteps, onChange}) => {
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
                           <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, 'Стандарт, за месяц', idx, true, '19$ за месяц')}>
                              <p className="dropdown-box-item__desc">За месяц</p>
                              <p className="dropdown-box-item__price">19 $ / месяц</p>
                           </div>
                           <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, 'Стандарт, за год', idx, true, '15$ в месяц')}>
                              <p className="dropdown-box-item__desc">За год</p>
                              <p className="dropdown-box-item__price">15 $ / месяц</p>
                              <p className="dropdown-box-item__bonus">Выгода -25%</p>
                           </div>
                        </div>
                     </div>

                     <div className="dropdown-box__item">
                        <h2 className="dropdown-box-item__title">Премиум</h2>

                        <div className="dropdown-box-item__info">
                           <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, 'Премиум, за месяц', idx, true, '49$ за месяц')}>
                              <p className="dropdown-box-item__desc">За месяц</p>
                              <p className="dropdown-box-item__price">49 $ / месяц</p>
                           </div>
                           <div className="dropdown-box-item-info__item" onClick={e => onChange(e, bot, 'Премиум, за год', idx, true, '39$ в месяц')}>
                              <p className="dropdown-box-item__desc">За год</p>
                              <p className="dropdown-box-item__price">39 $ / месяц</p>
                              <p className="dropdown-box-item__bonus">Выгода -25%</p>
                           </div>
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

         <Button
            onClick={() => setSteps(3)}
            disabled={checkedList.length === 0}
            className="tariff-next-btn main-theme-button"
            variant="contained"
            href=""
         >
            Выберите тариф
         </Button>
      </Fragment>
   );
};
