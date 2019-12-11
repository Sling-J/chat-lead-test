import React, {useEffect} from 'react';
import style from './setupSidebar.module.sass';
import {connect} from 'react-redux';

import {facebookAuthUrl, vkAuth, QRCodeUrl, resetUrl, editManager} from "../../../actions/actionCreator";
import {InputControler} from './inputControler';
import {Spin} from "antd";

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const SetupSidebar = (props) => {
   const botId = props.botSetupData.id;

   useEffect(() => {
      if (document.getElementById("sidebar") !== undefined) {
         InputControler();
      }
   });

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
               <p>ВЫБРАТЬ ТАРИФ</p>
            </p>
         </div>
         <div className={style.ui_vmenu_sep}>
            <div className={style.ui_vmenu__title}>
               <p className={style.ui_vmenu__item_p}>Добавить новый канал</p>
            </div>
            <form action="" className={style.ui_vmenu_sep_form}>
               <label className={style.ui_vmenu__item + " "}>
                  <input type="radio" name="radio" value="fb"/>
                  <span className={style.ui_vmenu__item_span}>Facebook Messenger</span>
               </label>
               <label className={style.ui_vmenu__item + " "}>
                  <input type="radio" name="radio" value="telegram"/>
                  <span className={style.ui_vmenu__item_span}>Telegram</span>
               </label>
               <label className={style.ui_vmenu__item + " "}>
                  <input type="radio" name="radio" value="vk"/>
                  <span className={style.ui_vmenu__item_span}>Вконтакте</span>
               </label>
               <label className={style.ui_vmenu__item + " "}>
                  <input type="radio" name="radio" value="whatsapp"/>
                  <span className={style.ui_vmenu__item_span}>Whatsapp</span>
               </label>
               <div className="for-fb">
                  {props.botSetupData.facebook_name !== '' ? (
                     <>
                        <p className={style.socialBotName}>{props.botSetupData.facebook_name}</p>
                        <p className={style.ui_vmenu__item_p}>
                           Для переавторизации: <br/>ШАГ 1: Авторизуйтесь через ваш
                           Facebook аккаунт. Вы должны иметь права на управление страницами Facebook.
                           <a
                              href="">Подробнее.
                           </a>
                        </p>
                        <Button
                           type="button"
                           variant="contained"
                           className={style.ui_vmenu_sep_button}
                           onClick={() => props.facebookAuthUrl(botId)}
                           disabled={props.setupLoading}
                        >
                           ПЕРЕАВТОРИЗАЦИЯ
                        </Button>
                     </>
                  ) : (
                     <div>
                        <p className={style.ui_vmenu__item_p}>
                           ШАГ 1: Авторизуйтесь через ваш Facebook аккаунт. Вы должны
                           иметь права на управление страницами Facebook. <a href="">Подробнее.</a>
                        </p>
                        <Button
                           type="button"
                           variant="contained"
                           onClick={() => props.facebookAuthUrl(botId)}
                           className={style.ui_vmenu_sep_button}
                           disabled={props.setupLoading}
                        >
                           {props.setupLoading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'}
                        </Button>
                     </div>
                  )}
               </div>
               <div className={`for-telegram ${style.ui_vmenu__box}`}>
                  {props.botSetupData.telegram_name !== '' ? (
                     <>
                        <p className={style.socialBotName}>{props.botSetupData.telegram_name }</p>
                        <p className={style.ui_vmenu__item_p}>
                           ШАГ 1: Введите токен доступа скрипт ниже.
                           <a href=""> Узнать больше </a>
                           о том, как получить токен.
                        </p>
                        <label className={style.ui_vmenu__item}>
                           <input type="text" name="token" placeholder="Token" className={style.telegram_input}/>
                        </label>
                        <Button
                           type="button"
                           variant="contained"
                           onClick={e => {
                              e.preventDefault();
                              props.editManager({
                                 idBot: botId,
                                 telegram_token: document.querySelector('input[name=token]').value,
                                 optional_params: ["telegram_token"]
                              });
                           }}
                           className={style.ui_vmenu_sep_button}
                           disabled={props.setupLoading}
                        >
                           {props.setupLoading ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗОВАТЬСЯ'}
                        </Button>
                     </>
                  ) : (
                     <div>
                        <p className={style.ui_vmenu__item_p}>
                           ШАГ 1: Введите токен доступа скрипт ниже.
                           <a href=""> Узнать больше </a>
                           о том, как получить токен.
                        </p>
                        <label className={style.ui_vmenu__item}>
                           <input type="text" name="token" placeholder="Token" className={style.telegram_input}/>
                        </label>
                        <Button
                           type="button"
                           variant="contained"
                           onClick={() => {
                              props.editManager({
                                 idBot: botId,
                                 telegram_token: document.querySelector('input[name=token]').value,
                                 optional_params: ["telegram_token"]
                              });
                           }}
                           className={style.ui_vmenu_sep_button}
                        >
                           <span>ПРОДОЛЖИТЬ</span>
                        </Button>
                     </div>
                  )}
               </div>
               <div className={`for-vk ${style.ui_vmenu__box}`}>
                  {props.botSetupData.vk_name !== '' ? (
                     <>
                        <p className={style.socialBotName}>{props.botSetupData.vk_name}</p>
                        <p className={style.ui_vmenu__item_p}>
                           ШАГ 1: Подключите свой аккаунт Вконтакте. Вам нужно иметь
                           права администратора.
                        </p>
                        <Button
                           type="button"
                           variant="contained"
                           onClick={() => props.vkAuth(botId)}
                           className={style.ui_vmenu_sep_button}
                           disabled={props.setupLoading}
                        >
                           {props.setupLoading ? <CircularProgress color="white"/> : 'ПЕРЕАВТОРИЗАЦИЯ'}
                        </Button>
                     </>
                  ) : (
                     <div>
                        <p className={style.ui_vmenu__item_p}>
                           ШАГ 1: Подключите свой аккаунт Вконтакте. Вам нужно иметь
                           права администратора.
                        </p>
                        <Button
                           type="button"
                           variant="contained"
                           onClick={() => props.vkAuth(botId)}
                           className={style.ui_vmenu_sep_button}
                           disabled={props.setupLoading}
                        >
                           {props.setupLoading ? <CircularProgress color="white"/> : 'АВТОРИЗОВАТЬСЯ'}
                        </Button>
                     </div>
                  )}
               </div>
               <div className={`for-whatsapp ${style.ui_vmenu__box}`}>
                  <p className={style.ui_vmenu__item_p}>
                     ШАГ 1: Откройте WhatsApp Web, наведите свой телефон чтобы
                     считать код
                  </p>
                  <Button
                     onClick={() => props.QRCodeUrl(botId)}
                     type="button"
                     variant="contained"
                     className={style.ui_vmenu_sep_button}
                  >
                     <span>ПОЛУЧИТЬ QR КОД</span>
                  </Button>
                  <div><img src={props.qrcodeurl} alt="" width="100%"/></div>
               </div>
            </form>
         </div>
      </aside>
   )
};

const mapStateToProps = ({botSetupReducers}) => {
   return {
      botSetupData: botSetupReducers.botSetupData,
      setupLoading: botSetupReducers.setupLoading,
      isFetching: botSetupReducers.isFetching,
      errorOfSocial: botSetupReducers.errorOfSocial,
      error: botSetupReducers.error,
      url: botSetupReducers.url
   }
};

const mapDispatchToProps = dispatch => ({
   editManager: setupData => dispatch(editManager(setupData)),
   facebookAuthUrl: botId => dispatch(facebookAuthUrl(botId)),
   QRCodeUrl: botId => dispatch(QRCodeUrl(botId)),
   vkAuth: botId => dispatch(vkAuth(botId)),
   resetUrl: () => dispatch(resetUrl()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupSidebar);
