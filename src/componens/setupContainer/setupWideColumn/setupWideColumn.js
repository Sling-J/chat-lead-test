import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
   editManager,
   updateBotReactions
} from '../../../actions/actionCreator';
import svr_r1 from '../../../svg/db/settings/301-chat.svg';
import svr_r2 from '../../../svg/db/settings/301-team-2.svg';
import svr_r3 from '../../../svg/db/settings/301-close.svg';
import svr_r4 from '../../../svg/db/settings/301-idea-1.svg';
import amocrm_logo from '../../../images/amocrm-logo-rect.png';
import bitrix_logo from '../../../images/bitrix-24-logo.png';

import SetupWideColumnModal from "./setupWideColumnModal/setupWideColumnModal";
import {getFilledStatus} from "../../../utils/socialFilledStatus";
import {destinationScenario} from "../../../constants/defaultValues";

import {Spin} from 'antd';

import style from './setupWideColumn.module.sass';

class SetupWideColumn extends Component {
   state = {
      isEmail: '',
      visible: false,
      willSend: false,
      asap: ''
   };

   componentDidMount() {
      const {botSetupData} = this.props;

      if (Object.keys(botSetupData).length !== 0) {
         if (botSetupData.application_will_send === 'False') {
            this.setState({willSend: false});
         } else if (botSetupData.application_will_send === 'True') {
            this.setState({willSend: true});
         } else {
            this.setState({willSend: botSetupData.application_will_send});
         }
      }
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {botSetupData} = this.props;

      if (prevProps.botSetupData.application_will_send !== botSetupData.application_will_send) {
         if (botSetupData.application_will_send === 'False') {
            this.setState({willSend: false});
         } else if (botSetupData.application_will_send === 'True') {
            this.setState({willSend: true});
         } else {
            this.setState({willSend: botSetupData.application_will_send});
         }
      }
   }

   showModal = isEmail => {
      this.setState({
         visible: true,
         isEmail: isEmail
      });
   };

   handleCancel = () => {
      this.setState({
         visible: false,
      });
   };

   reactionBots = (typeReaction, statusChecked) => {
      const botId = this.props.botSetupData.id;

      this.props.updateBotReactions({
         typeReaction,
         statusChecked,
         botId
      })
   };

   setWillSend = value => {
      this.setState({willSend: value});
   };

   isEmptyCheck = message => {
      const {botScenarios} = this.props;

      if (message) {
         const filteredMessage = botScenarios.find(scenario => scenario.id === parseInt(message));

         const facebook = filteredMessage && getFilledStatus('facebook', filteredMessage.triggers[0]);
         const telegram = filteredMessage && getFilledStatus('telegram', filteredMessage.triggers[0]);
         const whatsApp = filteredMessage && getFilledStatus('whatsapp', filteredMessage.triggers[0]);
         const vk = filteredMessage && getFilledStatus('vk', filteredMessage.triggers[0]);

         if (facebook || telegram || vk || whatsApp) {
            return true;
         }
      }

      return false;
   };

   render() {
      const {willSend} = this.state;
      const {editManager, botSetupData, isFetching, loadingOfManager} = this.props;
      const {default_response, welcome_message, subscribe_message, unsubscribe_message} = botSetupData;
      const botId = botSetupData.id;

      const isWelcomeMessageEmpty = this.isEmptyCheck(welcome_message);
      const isDefaultResponseEmpty = this.isEmptyCheck(default_response);
      const isSubscriptionMessage = this.isEmptyCheck(subscribe_message);
      const isUnsubscribeMessage = this.isEmptyCheck(unsubscribe_message);

      return (
         <div className={style.wideColumn}>
            <article>
               <Spin spinning={loadingOfManager ? false : Object.keys(botSetupData).length === 0 || isFetching}>
                  <header>
                     <h1 className={style.mainPageTitle}>Реакции бота</h1>

                     <div className={style.table}>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="1">
                           <label htmlFor={'welcome_message'}>
                              <img src={svr_r1} alt="Welcome message"/>
                              <div className={style.content}>
                                 <div>Приветственные сообщения</div>
                                 <p>Реакция на первое сообщение пользователя боту, срабатывает только 1 раз</p>
                              </div>
                              <div className={`${style.inputGroup} ${isWelcomeMessageEmpty && style.inputGroupCheck}`}>
                                 <input
                                    type={'checkbox'}
                                    id={'welcome_message'}
                                    className={style.statusIcon}
                                    checked={welcome_message && welcome_message !== 'null'}
                                    onChange={() => this.reactionBots(
                                       destinationScenario.welcome_message,
                                       true
                                    )}
                                 />
                                 <label htmlFor={'welcome_message'}/>
                              </div>
                           </label>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="2">
                           <label htmlFor={'follow'}>
                              <img src={svr_r2} alt="Follow message"/>
                              <div className={style.content}>
                                 <div>Реакция на подписку</div>
                                 <p>Сработает, только если пользователь писал в сообщество</p>
                              </div>
                              <div className={`${style.inputGroup} ${isSubscriptionMessage && style.inputGroupCheck}`}>
                                 <input
                                    type={'checkbox'}
                                    className={style.statusIcon}
                                    id={'follow'}
                                    checked={subscribe_message && subscribe_message !== 'null'}
                                    onChange={() => {
                                       this.reactionBots(
                                          destinationScenario.subscribe_message,
                                          true
                                       )
                                    }}
                                 />
                                 <label htmlFor={'follow'}/>
                              </div>
                           </label>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="3">
                           <label htmlFor={'reFollow'}>
                              <img src={svr_r3} alt="ReFollow message"/>
                              <div className={style.content}>
                                 <div>Реакция на отписку</div>
                                 <p>Сработает, только если пользователь писал в сообщество</p>
                              </div>
                              <div className={`${style.inputGroup} ${isUnsubscribeMessage && style.inputGroupCheck}`}>
                                 <input
                                    type={'checkbox'}
                                    className={style.statusIcon}
                                    id={'reFollow'}
                                    checked={unsubscribe_message && unsubscribe_message !== 'null'}
                                    onChange={() => {
                                       this.reactionBots(
                                          destinationScenario.unsubscribe_message,
                                          true
                                       )
                                    }}
                                 />
                                 <label htmlFor={'reFollow'}/>
                              </div>
                           </label>
                        </div>
                        <div className={style.table_row} dataaction="keywords" datatype="1" dataid="4">
                           <label htmlFor={'default_response'}>
                              <img src={svr_r4} alt="Default response"/>

                              <div className={style.content}>
                                 <div>Реакция на неизвестную команду</div>
                                 <p>Ответ на любое сообщение не по сценарию</p>
                              </div>
                              <div className={`${style.inputGroup} ${isDefaultResponseEmpty && style.inputGroupCheck}`}>
                                 <input
                                    type={'checkbox'}
                                    id={'default_response'}
                                    className={style.statusIcon}
                                    checked={default_response && default_response !== 'null'}
                                    onChange={() => this.reactionBots(
                                       destinationScenario.default_response,
                                       true
                                    )}
                                 />
                                 <label htmlFor={'default_response'}/>
                              </div>

                           </label>
                        </div>
                     </div>
                  </header>

                  <section>
                     <div className={style.notifyMe}>
                        <form>
                           <h3>Оповещение</h3>

                           <div className={style.switcher}>
                              <label className={style.switch}>
                                 <input
                                    type="checkbox"
                                    checked={willSend}
                                    onClick={() => {
                                       editManager({
                                          idBot: botId,
                                          application_will_send: !willSend,
                                          optional_params: ["application_will_send"]
                                       });
                                       this.setState(() => ({willSend: !willSend}));
                                    }}
                                 />
                                 <span className={style.slider + " " + style.round}/>
                              </label>
                              <p>Получать уведомления о заявках</p>
                           </div>

                           <div className={style.notifyBox}>
                              <div className={style.notifyBoxItem} onClick={() => this.showModal('email')}>
                                 <div className={style.notifyBoxItemIcon}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                       <title>E-mail</title>
                                       <path
                                          d="M20 7.83A3.008 3.008 0 0 1 18.17 6H5a1 1 0 1 1 0-2h13.17A3.001 3.001 0 1 1 22 7.83V19a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1.53-.848l7.453 4.658 5.462-3.642a1 1 0 0 1 1.11 1.664l-6 4a1 1 0 0 1-1.085.016L4 9.804V18h16V7.83zM21 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                                          fillRule="nonzero"
                                       />
                                    </svg>
                                 </div>

                                 <div>
                                    <h2 className={style.notifyBoxItemTitle}>E-mail</h2>
                                    <p className={style.notifyBoxItemDesc}>Отправка данных с формы на вашу почту</p>
                                 </div>
                              </div>

                              <div className={style.notifyBoxItem} onClick={() => this.showModal('telegram')}>
                                 <div className={style.notifyBoxItemIcon}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                       <title>Telegram</title>
                                       <path
                                          d="M19 6.83a3.001 3.001 0 1 1 2 0V16a1 1 0 0 1-1 1h-4.32l-2.9 3.625a1 1 0 0 1-1.56 0L8.32 17H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 0 2H5v10h3.8a1 1 0 0 1 .78.375L12 18.4l2.42-3.024A1 1 0 0 1 15.2 15H19V6.83zM20 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8 9a1 1 0 1 1 0-2h8a1 1 0 0 1 0 2H8zm0 4a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2H8z"
                                          fillRule="nonzero"/>
                                    </svg>
                                 </div>

                                 <div>
                                    <h2 className={style.notifyBoxItemTitle}>Telegram</h2>
                                    <p className={style.notifyBoxItemDesc}>Отправка данных с формы в Телеграм</p>
                                 </div>
                              </div>
                           </div>

                           <SetupWideColumnModal
                              setWillSend={this.setWillSend}
                              visible={this.state.visible}
                              willSend={this.state.willSend}
                              isEmail={this.state.isEmail}
                              handleCancel={this.handleCancel}
                           />
                        </form>
                     </div>
                  </section>

                  <section>
                     <div className={style.integration}>
                        <h1>Интеграция</h1>
                        <ul className={style.crm + " crm"}>
                           <li className="amocrm" id="amocrm-container" onClick={() => {
                              document.getElementById('bitrix-container').classList.remove(style.activeContainer);
                              document.getElementById('amocrm-container').classList.add(style.activeContainer);
                              document.getElementById('menu_bitrix').classList.remove(style.show);
                              document.getElementById('menu_amo').classList.add(style.show);
                           }}>
                              <div data-target="menu_amo">
                                 <img src={amocrm_logo} alt=""/>
                              </div>
                           </li>
                           <li className="bitrix" id="bitrix-container" onClick={() => {
                              document.getElementById('bitrix-container').classList.add(style.activeContainer);
                              document.getElementById('amocrm-container').classList.remove(style.activeContainer);
                              document.getElementById('menu_amo').classList.remove(style.show);
                              document.getElementById('menu_bitrix').classList.add(style.show);
                           }}>
                              <div data-target="menu_bitrix">
                                 <img src={bitrix_logo} alt=""/>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div id="amocrm-menu">
                        <div className={style.display} id="menu_amo">
                           <form action="">
                              <div className={style.inputGr}>
                                 <label htmlFor="domain">Домен в AmoCRM*</label>
                                 <input type="text" name="domain" placeholder="mycompany.amocrm.ru"/>
                                 <small>Адрес (домен) Вашей CRM, обычно это ??????.amocrm.ru<br/>Вводите его
                                    целиком
                                    вместе с .bitrix24.ru</small>
                              </div>

                              <div className={style.inputGr}>
                                 <label htmlFor="login">Логин*</label>
                                 <input type="text" name="login" placeholder="myname@mycompany.ru"/>
                                 <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                              </div>
                              <div className={style.inputGr}>
                                 <label htmlFor="api">Ключ API*</label>
                                 <input type="text" name="api" placeholder="a751f80701dae35cf334d648dc7352d7"/>
                                 <small>Ключ для доступа к API. Смотрите его в личном кабинете AmoCRM, в разделе
                                    Настройки - API - Ваш API ключ.</small>
                              </div>
                              <span>
                                 <button
                                    className={style.default_btn + " " + style.default_btn__primary}
                                    onClick={(e) => {
                                       e.preventDefault();
                                       editManager({
                                          idBot: botId,
                                          amocrm_domain: document.querySelector('#amocrm-menu input[name=domain]').value,
                                          optional_params: ["amocrm_domain"]
                                       });
                                    }}
                                 >
                                    Сохранить
                                 </button>
                              </span>
                           </form>
                        </div>
                        <div id="bitrix-menu">
                           <div className={style.display} id="menu_bitrix">
                              <form action="">
                                 <div className={style.inputGr}>
                                    <label htmlFor="domain">Домен в Bitrix24*</label>
                                    <input type="text" name="domain" placeholder="mycompany.bitrix24.ru"/>
                                    <small>Адрес (домен) Вашей CRM, обычно это ??????.bitrix24.ru<br/>Вводите
                                       его
                                       целиком вместе с .bitrix24.ru</small>
                                 </div>

                                 <div className={style.inputGr}>
                                    <label htmlFor="webhook">Код веб-хука*</label>
                                    <input type="text" name="webhook" placeholder="xxxxxxxxxxxxxxxx"/>
                                    <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                                 </div>
                                 <div className={style.inputGr}>
                                    <label htmlFor="userId">Номер пользователя*</label>
                                    <input type="text" name="usedId" placeholder="1"/>
                                    <small>
                                       Номер пользователя, которому принадлежит веб-хук (по-умолчанию:
                                       1).
                                    </small>
                                 </div>

                                 <span>
                                    <button
                                       className={style.default_btn + " " + style.default_btn__primary}
                                       onClick={(e) => {
                                          e.preventDefault();
                                          editManager({
                                             idBot: botId,
                                             bitrix_domain: document.querySelector('#bitrix-menu input[name=domain]').value,
                                             optional_params: ["bitrix_domain"]
                                          });
                                       }}
                                    >
                                       Сохранить
                                    </button>
                                 </span>
                              </form>
                           </div>
                        </div>
                     </div>
                  </section>
               </Spin>
            </article>
         </div>
      )
   }
}

const mapStateToProps = ({botSetupReducers, singleBotReducers}) => ({
   loadingOfManager: botSetupReducers.loadingOfManager,
   botSetupData: botSetupReducers.botSetupData,
   isFetching: botSetupReducers.isFetching,
   error: botSetupReducers.error,
   botScenarios: singleBotReducers.botScenarios
});

const mapDispatchToProps = dispatch => ({
   updateBotReactions: reactionsData => dispatch(updateBotReactions(reactionsData)),
   editManager: setupData => dispatch(editManager(setupData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupWideColumn);
