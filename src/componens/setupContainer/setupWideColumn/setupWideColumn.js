import React, {Component} from 'react';
import style from './setupWideColumn.module.sass';
import {connect} from 'react-redux';
// import { stringLiteral } from '@babel/types';
import {
   getManager,
   editManager,
   updateBotReactions
} from '../../../actions/actionCreator';
import svr_r1 from '../../../svg/db/settings/301-chat.svg';
import svr_r2 from '../../../svg/db/settings/301-team-2.svg';
import svr_r3 from '../../../svg/db/settings/301-close.svg';
import svr_r4 from '../../../svg/db/settings/301-idea-1.svg';
import amocrm_logo from '../../../images/amocrm-logo-rect.png';
import bitrix_logo from '../../../images/bitrix-24-logo.png';
import {destinationScenario} from "../../../constants/defaultValues";
import faceBookMassanger from "../../../images/facebook-messenger-logo-big.png";


class SetupWideColumn extends Component {
   state = {
      willSend: false,
      emailList: [],
      telList: [],
      email: '',
      tel: '',
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {emailList, telList} = this.state;
      const {botSetupData} = this.props;

      if (prevProps.botSetupData !== botSetupData) {
         let resEmailList = botSetupData.application_email.split(",").filter(item => item.length !== 0);
         let resTelList = botSetupData.application_whatsapp_id.split(",").filter(item => item.length !== 0);
         let willSend = botSetupData.application_will_send;

         this.setState({
            emailList: resEmailList,
            telList: resTelList,
            willSend: willSend
         });
      }
   }

   reactionBots = (typeReaction, statusChecked) => {
      const botId = this.props.botSetupData.id;

      this.props.updateBotReactions({
         typeReaction,
         statusChecked,
         botId
      })
   };

   handleSubmit = event => {
      event.preventDefault();

      const {email, tel, emailList, telList} = this.state;
      const {botSetupData, editManager} = this.props;

      const botId = botSetupData.id;

      this.setState({willSend: true});

      if (email.length !== 0) {
         const newEmailList = [
            ...emailList,
            email
         ];

         editManager({
            idBot: botId,
            application_will_send: true,
            application_email: newEmailList.toString(),
            application_whatsapp_id: telList.toString(),
            optional_params: ["application_email", "application_whatsapp_id", "application_will_send"]
         });
      }

      if (tel.length !== 0) {
         const newTelList = [
            ...telList,
            tel
         ];

         editManager({
            idBot: botId,
            application_will_send: true,
            application_email: emailList.toString(),
            application_whatsapp_id: newTelList.toString(),
            optional_params: ["application_email", "application_whatsapp_id", "application_will_send"]
         });
      }

      this.setState({
         email: '',
         tel: ''
      })
   };

   deleteNotificationElement = (type, index) => {
      const {emailList, telList, willSend} = this.state;
      const {editManager, botSetupData} = this.props;
      const botId = botSetupData.id;

      if (type === "email") {
         let newEmailList = [...emailList];
         newEmailList.splice(index, 1)

         editManager({
            idBot: botId,
            application_will_send: willSend,
            application_email: newEmailList.toString(),
            application_whatsapp_id: telList.toString(),
            optional_params: ["application_email", "application_whatsapp_id", "application_will_send"]
         });
      }

      if (type === "tel") {
         let newTelList = [...telList];
         newTelList.splice(index, 1)

         editManager({
            idBot: botId,
            application_will_send: willSend,
            application_email: emailList.toString(),
            application_whatsapp_id: newTelList.toString(),
            optional_params: ["application_email", "application_whatsapp_id", "application_will_send"]
         });
      }
   };

   render() {
      const {telList, willSend, emailList, email, tel} = this.state;
      const {editManager, botSetupData} = this.props;
      const {default_response, welcome_message, subscription_message} = botSetupData;
      const botId = botSetupData.id;

      return (
         <div className={style.wideСolumn}>
            <article>
               <header>
                  <h1 className={style.mainPageTitle}>Реакции бота
                  </h1>

                  <div className={style.table + " " + style.table__settings}>
                     <div className={style.table_row}>
                        <label htmlFor={'welcome_message'}>
                           <img src={svr_r1} alt="" className={style.table_image}/>
                           <div className={style.content}>
                              <div className={style.label}>Приветственные сообщения</div>
                              <p>Реакция на первое сообщение пользователя боту, срабатывает только 1 раз</p>
                           </div>
                           <div className={style.inputGroup}>
                              <input
                                 type={'checkbox'}
                                 id={'welcome_message'}
                                 className={style.statusIcon}
                                 checked={welcome_message && welcome_message !== 'null'}
                                 onChange={(e) => this.reactionBots(
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
                           <img src={svr_r2} alt="" className={style.table_image}/>

                           <div className={style.content}>
                              <div className={style.label}>Реакция на подписку</div>
                              <p>Сработает, только если пользователь писал в сообщество</p>
                           </div>

                           <div className={style.inputGroup}>
                              <input
                                 type={'checkbox'}
                                 className={style.statusIcon}
                                 id={'follow'}
                                 checked={subscription_message && subscription_message !== 'null'}
                                 onChange={(e) => this.reactionBots(
                                    destinationScenario.subscription_message,
                                    true
                                 )}
                              />
                              <label htmlFor={'follow'}/>
                           </div>
                        </label>
                     </div>
                     <div className={style.table_row} dataaction="keywords" datatype="1" dataid="3">
                        <label htmlFor={'refollow'}>
                           <img src={svr_r3} alt="" className={style.table_image}/>

                           <div className={style.content}>
                              <div className={style.label}>Реакция на отписку</div>
                              <p>Сработает, только если пользователь писал в сообщество</p>
                           </div>
                           <div className={style.inputGroup}>
                              <input
                                 type={'checkbox'}
                                 className={style.statusIcon}
                                 id={'refollow'}
                                 disabled={true}
                              />
                              <label htmlFor={'refollow'}/>
                           </div>

                        </label>
                     </div>
                     <div className={style.table_row} dataaction="keywords" datatype="1" dataid="4">
                        <label htmlFor={'default_response'}>
                           <img src={svr_r4} alt="" className={style.table_image}/>

                           <div className={style.content}>
                              <div className={style.label}>Реакция на неизвестную команду</div>
                              <p>Ответ на любое сообщение не по сценарию</p>
                           </div>
                           <div className={style.inputGroup}>

                              <input
                                 type={'checkbox'}
                                 id={'default_response'}
                                 className={style.statusIcon}
                                 checked={default_response && default_response !== 'null'}
                                 onChange={(e) => this.reactionBots(
                                    destinationScenario.default_response,
                                    e.target.checked
                                 )}
                              />
                              <label htmlFor={'default_response'}/>
                           </div>

                        </label>
                     </div>

                  </div>

               </header>
               <section>
                  <div className={style.notifyme}>
                     <form action="" onSubmit={(e) => this.handleSubmit(e)}>
                        <h3>Оповещение</h3>
                        <div className={style.switcher}>
                           <label className={style.switch}>
                              <input type="checkbox" checked={willSend}
                                     onClick={(e) => this.setState(() => ({willSend: !willSend}))}/>
                              <span className={style.slider + " " + style.round}/>
                           </label>
                           <p>Получать уведомления о заявках</p>
                           {/*<button className={style.default_btn+" "+style.default_btn__primary} onClick={(e) =>{*/}
                           {/*    e.preventDefault();*/}
                           {/*    console.log(document.querySelector('.'+style.notifyme+' input[type=checkbox]').checked)*/}
                           {/*    props.editManager({*/}
                           {/*        idBot: botId,*/}
                           {/*        application_will_send: willSend,*/}
                           {/*        application_email: document.querySelector('.'+style.notifyme+' input[name=mail]').value,*/}
                           {/*        application_whatsapp_id: document.querySelector('.'+style.notifyme+' input[name=phone]').value,*/}
                           {/*        optional_params: ["application_email", "application_whatsapp_id", "application_will_send"]*/}
                           {/*    });*/}
                           {/*}}>*/}
                           {/*    Сохранить*/}
                           {/*</button>*/}
                        </div>
                        {}
                        <div className={style.switcher + " "}>
                           <div className={style.switcherContainer}>
                              <div className={style.list}>
                                 {emailList && emailList.map((email, index) =>
                                    <div>
                                       {email}
                                       <span
                                          onClick={() => this.deleteNotificationElement("email", index)}>×</span>
                                    </div>
                                 )}
                                 <input
                                    id="notificationEmail"
                                    type="text"
                                    name="mail"
                                    placeholder="example@mail.com"
                                    onChange={e => this.setState({email: e.target.value})}
                                    value={email}
                                 />
                              </div>

                           </div>

                           <div className={style.switcherContainer}>
                              <div className={style.list}>
                                 {telList && telList.map((tel, index) =>
                                    <div>
                                       {tel}
                                       <span
                                          onClick={() => this.deleteNotificationElement("tel", index)}>×</span>
                                    </div>
                                 )}
                                 <input
                                    id="notificationTel"
                                    type="text"
                                    name="phone"
                                    placeholder="+7 ___ ___ __ __"
                                    onChange={e => this.setState({tel: e.target.value})}
                                    value={tel}
                                 />
                              </div>

                           </div>

                           {/*<input type="text" name="phone" placeholder="+7 ___ ___ __ __"/>*/}
                        </div>
                        <div className={style.switcher + " " + style.underinput}>
                           <span>Добавьте емейл, на который отправлять уведомления и нажмите Enter </span>
                           <span>Или Напишите WhatsApp номер</span>
                        </div>
                        <button className={style.default_btn + " " + style.default_btn__primary}>Сохранить
                        </button>
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
                           <a href="javascript:void(0)" data-target="menu_amo">
                              <img src={amocrm_logo} alt=""/>
                           </a>
                        </li>
                        <li className="bitrix" id="bitrix-container" onClick={() => {
                           document.getElementById('bitrix-container').classList.add(style.activeContainer);
                           document.getElementById('amocrm-container').classList.remove(style.activeContainer);
                           document.getElementById('menu_amo').classList.remove(style.show);
                           document.getElementById('menu_bitrix').classList.add(style.show);
                        }}>
                           <a href="javascript:void(0)" data-target="menu_bitrix">
                              <img src={bitrix_logo} alt=""/>
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div id="amocrm-menu">
                     <div className={style.display} id="menu_amo">
                        <form action="">
                           <div className={style.inputGr}>
                              <label for="domain">Домен в AmoCRM*</label>
                              <input type="text" name="domain" placeholder="mycompany.amocrm.ru"/>
                              <small>Адрес (домен) Вашей CRM, обычно это ??????.amocrm.ru<br/>Вводите его
                                 целиком
                                 вместе с .bitrix24.ru</small>
                           </div>

                           <div className={style.inputGr}>
                              <label for="login">Логин*</label>
                              <input type="text" name="login" placeholder="myname@mycompany.ru"/>
                              <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                           </div>
                           <div className={style.inputGr}>
                              <label for="api">Ключ API*</label>
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
                                 <label for="domain">Домен в Bitrix24*</label>
                                 <input type="text" name="domain" placeholder="mycompany.bitrix24.ru"/>
                                 <small>Адрес (домен) Вашей CRM, обычно это ??????.bitrix24.ru<br/>Вводите
                                    его
                                    целиком вместе с .bitrix24.ru</small>
                              </div>
                              <div className={style.inputGr}>
                                 <label>Способ подключения</label>
                                 <div className={style.checkboxs}>
                                    <input type="checkbox" name="checkbox" checked=""/>
                                    <label for="checkbox">Веб-хук (рекомендуется) Современный способ,
                                       максимум
                                       возможностей (передача UTM-меток в нативные поля).</label>
                                 </div>
                                 <div className={style.checkboxs}>
                                    <input type="checkbox" name="checkbox"/>
                                    <label for="checkbox">Старое API Передача UTM-меток в нативные поля не
                                       поддерживается.</label>
                                 </div>
                              </div>
                              <div className={style.inputGr}>
                                 <label for="webhook">Код веб-хука*</label>
                                 <input type="text" name="webhook" placeholder="xxxxxxxxxxxxxxxx"/>
                                 <small>Код активации веб-хука, например: 82te1pjdphsa9u19.</small>
                              </div>
                              <div className={style.inputGr}>
                                 <label for="userId">Номер пользователя*</label>
                                 <input type="text" name="usedId" placeholder="1"/>
                                 <small>Номер пользователя, которому принадлежит веб-хук (по-умолчанию:
                                    1).</small>
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
            </article>
         </div>
      )
   }
}

const mapStateToProps = state => {
   const {botSetupData, isFetching, error} = state.botSetupReducers;

   return {
      botSetupData, isFetching, error
   }
};

const mapDispatchToProps = dispatch => ({
   getManager: (botId) => dispatch(getManager(botId)),
   editManager: (setupData) => dispatch(editManager(setupData)),
   updateBotReactions: (reactionsData) => dispatch(updateBotReactions(reactionsData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupWideColumn);
