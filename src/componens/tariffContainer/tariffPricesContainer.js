import React from 'react';

import {useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';

const TabPanel = ({standard, premium, value, index}) => {
   const Item = ({price, title, socials}) => (
      <div className="prices-box__item">
         <div className="prices-box-item__divider"/>

         <div className="prices-box-item__offer">
            <h3 className="prices-box-item-offer__title">{title}</h3>

            <p className="prices-box-item-offer__price">
               <span>{price}</span> $ / {price === 0 ? '∞' : 'месяц'}
            </p>
            <p className="prices-box-item-offer__desc">
               {socials}
            </p>
            <Button variant="contained" className="prices-box-item-offer__button" href="">
               Выбрать
            </Button>
         </div>

         <ul className="prices-box-item__info">
            <li>Количество подписчиков ∞</li>
            <li>Не ограничено рассылок </li>
            <li>Интеграция с CRM</li>
            <li>Внутренняя CRM система</li>
            <li>Обращения по имени</li>
            <li>Блок «Таймер» </li>
            <li>Блок «Кнопки»</li>
            <li>Отвечает по ключевым словам </li>
            <li>Оповещения «Отправить Email» </li>
            <li>Оповещения «Telegram»</li>
            <li>Мини Landing Page</li>
            <li>Инструменты для роста базы, чат-ботаи автоворонки</li>
            <li>Живой чат с подписчиками</li>
         </ul>
      </div>
   );

   return value === index && (
      <p className="prices-box pv1-flex pv1-j-sb">
         <Item
            title="Бесплатный"
            socials="VK бот"
            price={0}
         />
         <Item
            title="Стандарт"
            socials="VK / Telegram / Facebook"
            price={standard}
         />
         <Item
            title="Премиум"
            socials="VK / Telegram / Facebook / WhatsApp"
            price={premium}
         />
      </p>
   )
};

const TariffPricesContainer = () => {
   const theme = useTheme();

   const [value, setValue] = React.useState(0);

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   return (
      <div className="main-container prices-container">
         <ul className="prices-tabs">
            <li className={value === 0 && 'prices-tabs__active'} onClick={() => handleChange(0)}>За год (-25%)</li>
            <li className={value === 1 && 'prices-tabs__active'} onClick={() => handleChange(1)}>За месяц</li>
         </ul>
         <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
         >
            <TabPanel value={value} index={0} standard={15} premium={39}/>
            <TabPanel value={value} index={1} standard={19} premium={49}/>
         </SwipeableViews>
      </div>
   );
};

export default TariffPricesContainer;
