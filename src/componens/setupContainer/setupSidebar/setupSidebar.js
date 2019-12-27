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

const TabPanel = ({value, index, handleSubmit, loading, socialName, setTelegramToken, error}) => {
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
            <div className={style.tabsContainerField}>
               <input type="text" placeholder="Token" onChange={e => setTelegramToken(e.target.value)}/>
            </div>
         )}

         <Button
            type="button"
            variant="contained"
            onClick={handleSubmit}
            className={style.ui_vmenu_sep_button}
            disabled={loading}
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

   const botId = props.botSetupData.id;
   const theme = useTheme();

   useEffect(() => {
      if (props.url.length !== 0) {
         props.resetUrl();
      }
   }, []);

   useEffect(() => {
      if (props.url.length !== 0) {
         window.open(props.url);
      }
   }, [props.url]);

   const handleChange = (value) => {
      setValue(value);
   };

   const handleChangeIndex = index => {
      setValue(index);
   };

   const paidDay = props.botSetupData.length !== 0 &&
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
                  <Link to="/bots/tariff/payment">ВЫБРАТЬ ТАРИФ</Link>
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
                  <TabPanel value={value} index={0} socialName={props.botSetupData.facebook_name} handleSubmit={() => props.facebookAuthUrl(botId)} error={props.error}/>
                  <TabPanel value={value} index={1} socialName={props.botSetupData.telegram_name} handleSubmit={() => props.editManager({
                     idBot: botId,
                     telegram_token: telegramToken,
                     optional_params: ["telegram_token"]
                  })} setTelegramToken={setTelegramToken} error={props.error}/>
                  <TabPanel value={value} index={2} socialName={props.botSetupData.vk_name} handleSubmit={() => props.vkAuth(botId)} error={props.error}/>
                  <TabPanel value={value} index={3} socialName={props.botSetupData} handleSubmit={() => props.QRCodeUrl(botId)} error={props.error}/>
               </SwipeableViews>
            </div>

            {/*<form action="" className={style.ui_vmenu_sep_form}>*/}
            {/*   <label className={style.ui_vmenu__item + " "}>*/}
            {/*      <input type="radio" name="radio" value="fb"/>*/}
            {/*      <span className={style.ui_vmenu__item_span}>Facebook Messenger</span>*/}
            {/*   </label>*/}
            {/*   <label className={style.ui_vmenu__item + " "}>*/}
            {/*      <input type="radio" name="radio" value="telegram"/>*/}
            {/*      <span className={style.ui_vmenu__item_span}>Telegram</span>*/}
            {/*   </label>*/}
            {/*   <label className={style.ui_vmenu__item + " "}>*/}
            {/*      <input type="radio" name="radio" value="vk"/>*/}
            {/*      <span className={style.ui_vmenu__item_span}>Вконтакте</span>*/}
            {/*   </label>*/}
            {/*   <label className={style.ui_vmenu__item + " "}>*/}
            {/*      <input type="radio" name="radio" value="whatsapp"/>*/}
            {/*      <span className={style.ui_vmenu__item_span}>Whatsapp</span>*/}
            {/*   </label>*/}
            {/*   */}
            {/*   <div className="for-fb">*/}
            {/*      {Object.keys(props.botSetupData).length !== 0 && props.botSetupData.facebook_name !== '' ? (*/}
            {/*         <>*/}
            {/*            <p className={style.socialBotName}>{props.botSetupData.facebook_name}</p>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               Для переавторизации: <br/>ШАГ 1: Авторизуйтесь через ваш*/}
            {/*               Facebook аккаунт. Вы должны иметь права на управление страницами Facebook.*/}
            {/*               <a*/}
            {/*                  href="">Подробнее.*/}
            {/*               </a>*/}
            {/*            </p>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               onClick={() => props.facebookAuthUrl(botId)}*/}
            {/*               disabled={props.setupLoading}*/}
            {/*            >*/}
            {/*               ПЕРЕАВТОРИЗАЦИЯ*/}
            {/*            </Button>*/}
            {/*         </>*/}
            {/*      ) : (*/}
            {/*         <div>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               ШАГ 1: Авторизуйтесь через ваш Facebook аккаунт. Вы должны*/}
            {/*               иметь права на управление страницами Facebook. <a href="">Подробнее.</a>*/}
            {/*            </p>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               onClick={() => props.facebookAuthUrl(botId)}*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               disabled={props.setupLoading}*/}
            {/*            >*/}
            {/*               {props.setupLoading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'}*/}
            {/*            </Button>*/}
            {/*         </div>*/}
            {/*      )}*/}
            {/*   </div>*/}
            {/*   <div className={`for-telegram ${style.ui_vmenu__box}`}>*/}
            {/*      {Object.keys(props.botSetupData).length !== 0 && props.botSetupData.telegram_name !== '' ? (*/}
            {/*         <>*/}
            {/*            <p className={style.socialBotName}>{props.botSetupData.telegram_name }</p>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               ШАГ 1: Введите токен доступа скрипт ниже.*/}
            {/*               <a href=""> Узнать больше </a>*/}
            {/*               о том, как получить токен.*/}
            {/*            </p>*/}
            {/*            <label className={`${style.ui_vmenu__item} ${style.ui_vmenu__item__telegram}`}>*/}
            {/*               <input*/}
            {/*                  type="text"*/}
            {/*                  name="token"*/}
            {/*                  placeholder="Token"*/}
            {/*                  className={style.telegram_input}*/}
            {/*               />*/}
            {/*            </label>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               onClick={() => props.editManager({*/}
            {/*                  idBot: botId,*/}
            {/*                  telegram_token: document.querySelector('input[name=token]').value,*/}
            {/*                  optional_params: ["telegram_token"]*/}
            {/*               })}*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               disabled={props.isFetching}*/}
            {/*            >*/}
            {/*               {props.isFetching ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗОВАТЬСЯ'}*/}
            {/*            </Button>*/}
            {/*         </>*/}
            {/*      ) : (*/}
            {/*         <div>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               ШАГ 1: Введите токен доступа скрипт ниже.*/}
            {/*               <a href=""> Узнать больше </a>*/}
            {/*               о том, как получить токен.*/}
            {/*            </p>*/}
            {/*            <label className={`${style.ui_vmenu__item} ${style.ui_vmenu__item__telegram}`}>*/}
            {/*               <input*/}
            {/*                  type="text"*/}
            {/*                  name="token"*/}
            {/*                  placeholder="Token"*/}
            {/*                  className={style.telegram_input}*/}
            {/*               />*/}
            {/*            </label>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               onClick={() => props.editManager({*/}
            {/*                  idBot: botId,*/}
            {/*                  telegram_token: document.querySelector('input[name=token]').value,*/}
            {/*                  optional_params: ["telegram_token"]*/}
            {/*               })}*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               disabled={props.isFetching}*/}
            {/*            >*/}
            {/*               {props.isFetching ? <CircularProgress color="white"/> : 'ПРОДОЛЖИТЬ'}*/}
            {/*            </Button>*/}
            {/*         </div>*/}
            {/*      )}*/}
            {/*   </div>*/}
            {/*   <div className={`for-vk ${style.ui_vmenu__box}`}>*/}
            {/*      {Object.keys(props.botSetupData).length !== 0 && props.botSetupData.vk_name !== '' ? (*/}
            {/*         <>*/}
            {/*            <p className={style.socialBotName}>{props.botSetupData.vk_name}</p>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               ШАГ 1: Подключите свой аккаунт Вконтакте. Вам нужно иметь*/}
            {/*               права администратора.*/}
            {/*            </p>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               onClick={() => props.vkAuth(botId)}*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               disabled={props.setupLoading}*/}
            {/*            >*/}
            {/*               {props.setupLoading ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗАЦИЯ'}*/}
            {/*            </Button>*/}
            {/*         </>*/}
            {/*      ) : (*/}
            {/*         <div>*/}
            {/*            <p className={style.ui_vmenu__item_p}>*/}
            {/*               ШАГ 1: Подключите свой аккаунт Вконтакте. Вам нужно иметь*/}
            {/*               права администратора.*/}
            {/*            </p>*/}
            {/*            <Button*/}
            {/*               type="button"*/}
            {/*               variant="contained"*/}
            {/*               onClick={() => props.vkAuth(botId)}*/}
            {/*               className={style.ui_vmenu_sep_button}*/}
            {/*               disabled={props.setupLoading}*/}
            {/*            >*/}
            {/*               {props.setupLoading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'}*/}
            {/*            </Button>*/}
            {/*         </div>*/}
            {/*      )}*/}
            {/*   </div>*/}
            {/*   <div className={`for-whatsapp ${style.ui_vmenu__box}`}>*/}
            {/*      <p className={style.ui_vmenu__item_p}>*/}
            {/*         ШАГ 1: Откройте WhatsApp Web, наведите свой телефон чтобы*/}
            {/*         считать код*/}
            {/*      </p>*/}
            {/*      <Button*/}
            {/*         onClick={() => props.QRCodeUrl(botId)}*/}
            {/*         type="button"*/}
            {/*         variant="contained"*/}
            {/*         className={style.ui_vmenu_sep_button}*/}
            {/*      >*/}
            {/*         <span>ПОЛУЧИТЬ QR КОД</span>*/}
            {/*      </Button>*/}
            {/*      <div><img src={props.qrcodeurl} alt="" width="100%"/></div>*/}
            {/*   </div>*/}
            {/*</form>*/}
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
