import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {facebookAuthUrl, vkAuthUrl, QRCodeUrl, resetUrl, editManager} from "../../../actions/actionCreator";
import {Spin} from "antd";

import {useTheme} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import style from './setupSidebar.module.sass';
import SwipeableViews from "react-swipeable-views";

const TabPanel = ({value, index, handleSubmit, loading, socialName, setTelegramToken, error, isFetching}) => {
   return value === index && (
      <p className={style.tabsContainerMenu}>
         {
            value === 0 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Авторизуйтесь через ваш Facebook аккаунт. Вы должны иметь права на управление страницами Facebook. <a href="" target="_blank">Подробнее.</a></p> :
            value === 1 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Введите токен доступа скрипт ниже. <a href="" target="_blank">узнаете больше</a> о том, как получить токен.</p> :
            value === 2 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Подключите свой аккаунт Вконтакте. Вам нужно иметь права администратора.</p> :
            value === 3 ? <p className={style.tabsContainerMenuText}>ШАГ 1:  Откройте WhatsApp Web, наведите свой телефон чтобы считать код</p> :
            ''
         }

         <p className={style.socialBotName}>{socialName}</p>

         {value === 1 && (
            <p className={style.tabsContainerField}>
               <input type="text" placeholder="Token" onChange={e => setTelegramToken(e.target.value)}/>
            </p>
         )}

         <Button
            type="button"
            variant="contained"
            onClick={handleSubmit}
            className={style.ui_vmenu_sep_button}
            disabled={loading || isFetching}
         >
            {socialName === '' || !socialName ?
               loading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'
            : (
               loading ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗАЦИЯ'
            )}
         </Button>

         <p className={style.errorMsg}>
            {error === 'Network Error' ? '' : error}
         </p>
      </p>
   );
};

const SetupSidebar = props => {
   const [value, setValue] = useState(0);
   const [telegramToken, setTelegramToken] = useState('');

   const botId = props.botSetupData && Object.keys(props.botSetupData).length !== 0 && props.botSetupData.id;
   const theme = useTheme();

   useEffect(() => {
      if (props.url.length !== 0) {
         props.resetUrl();
      }
   }, []);

   useEffect(() => {
      if (props.url.length !== 0) {
         window.open(props.url);
         props.resetUrl();
      }
   }, [props.url]);

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   const paidDay = Object.keys(props.botSetupData).length !== 0 &&
      props.botSetupData.payed_end_date >= 5 ? `Ваш пробный период заканчивается через ${props.botSetupData.payed_end_date} дней.` :
         props.botSetupData.payed_end_date >= 2 ? `Ваш пробный период заканчивается через ${props.botSetupData.payed_end_date} дня.` :
            props.botSetupData.payed_end_date === 1 ? `Ваш пробный период заканчивается через ${props.botSetupData.payed_end_date} день.` :
               props.botSetupData.payed_end_date === 0 ? 'Пробный период закончился.' :
                  <Spin size="large"/>;

   return (
      <aside id="sidebar" className={style.setupSidebar}>
         <div className={style.groupBlock}>
            <p className={style.groupBlock__text}>
               {paidDay}
               <p>
                  <Link to="/bots/tariff/prices">ВЫБРАТЬ ТАРИФ</Link>
               </p>
            </p>
         </div>
         <div className={style.ui_vmenu_sep}>
            <div className={style.ui_vmenu__title}>
               <p className={style.ui_vmenu__item_p}>Добавить новый канал</p>
            </div>

            <div className={style.tabsContainer}>
               <ul>
                  <li className={`${style.tabsContainerItem} ${value === 0 && style.tabsContainerItemActive}`} onClick={() => handleChange(0)}>Facebook Messenger</li>
                  <li className={`${style.tabsContainerItem} ${value === 1 && style.tabsContainerItemActive}`} onClick={() => handleChange(1)}>Telegram</li>
                  <li className={`${style.tabsContainerItem} ${value === 2 && style.tabsContainerItemActive}`} onClick={() => handleChange(2)}>Вконтакте</li>
                  <li className={`${style.tabsContainerItem} ${value === 3 && style.tabsContainerItemActive}`} onClick={() => handleChange(3)}>WhatsApp</li>
               </ul>

               <SwipeableViews
                  onChangeIndex={handleChangeIndex}
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={value}
               >
                  <TabPanel value={value} index={0} loading={props.setupLoading} isFetching={props.isFetching} socialName={props.botSetupData.facebook_name} handleSubmit={() => props.facebookAuthUrl(botId)} error={props.error}/>
                  <TabPanel value={value} index={1} loading={props.setupLoading} isFetching={props.isFetching} socialName={props.botSetupData.telegram_name} handleSubmit={() => props.editManager({idBot: botId, telegram_token: telegramToken, optional_params: ["telegram_token"]})} setTelegramToken={setTelegramToken} error={props.error}/>
                  <TabPanel value={value} index={2} loading={props.setupLoading} isFetching={props.isFetching} socialName={props.botSetupData.vk_name} handleSubmit={() => props.vkAuth(botId)} error={props.error}/>
                  <TabPanel value={value} index={3} loading={props.isFetching} isFetching={props.isFetching} socialName={props.botSetupData.whatsapp_instance} handleSubmit={() => props.QRCodeUrl(botId)} error={props.error}/>
               </SwipeableViews>
            </div>
         </div>
      </aside>
   )
};

const mapStateToProps = ({botSetupReducers}) => ({
   botSetupData: botSetupReducers.botSetupData,
   setupLoading: botSetupReducers.setupLoading,
   isFetching: botSetupReducers.isFetching,
   errorOfSocial: botSetupReducers.errorOfSocial,
   error: botSetupReducers.error,
   url: botSetupReducers.url
});

const mapDispatchToProps = dispatch => ({
   editManager: telegramData => dispatch(editManager(telegramData)),
   facebookAuthUrl: botId => dispatch(facebookAuthUrl(botId)),
   QRCodeUrl: botId => dispatch(QRCodeUrl(botId)),
   vkAuth: botId => dispatch(vkAuthUrl(botId)),
   resetUrl: () => dispatch(resetUrl()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupSidebar);
