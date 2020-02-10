import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faHandPointUp, faLink, faPhoneAlt, faTimes} from "@fortawesome/free-solid-svg-icons";

import {buttonsTypes, defaultValuesForNewButtons} from "../../../../../constants/defaultValues";
import Actions from "../../../../messages/buttonsContainer/actions/actions";
import Controls from '../../../../messages/buttonsContainer/buttonsMenu/controls/controls';

import style from '../../../../../styles/messageButtons.module.scss';
import {Select} from "antd";

const {Option, OptGroup} = Select;

class ButtonsMenu extends Component {
   state = {
      isSendTextBtn: false,
   };

   componentDidUpdate(prevProps, prevState, snapshot) {
      const {createdTriggerId, scenarioId, botScenarios} = this.props;
      const {isSendTextBtn} = this.state;

      const changedScenario = botScenarios.filter(elem => elem.id === scenarioId)[0];

      if ((prevProps.createdTriggerId !== createdTriggerId) && isSendTextBtn) {
         const createdTrigger = changedScenario.triggers.find(trigger => trigger.id === createdTriggerId);

         this.editButton({
            target: {
               value: createdTrigger.id,
               trigger: createdTrigger,
            }
         });

         this.setState({isSendTextBtn: false});
      }
   }

   editButton = (e, forCaption) => {
      const {typeButton, buttonData, buttonEditHandler, indexButton} = this.props;

      if (typeButton === buttonsTypes.text_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               createdTrigger: e.target.trigger,
               payload: {
                  trigger_id: e.target.value
               }
            })
         }

         buttonEditHandler(typeButton, buttonData, indexButton);
      } else if (typeButton === buttonsTypes.url_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               payload: {
                  url: e.target.value
               }
            })
         }

         buttonEditHandler(typeButton, buttonData, indexButton);
      } else if (typeButton === buttonsTypes.call_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               payload: {
                  call: e.target.value
               }
            })
         }

         buttonEditHandler(typeButton, buttonData, indexButton);
      } else if (typeButton === buttonsTypes.trigger_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               payload: {
                  trigger_id: e.target.value
               }
            })
         }

         buttonEditHandler(typeButton, buttonData, indexButton);
      } else if (typeButton === 'empty') {
         Object.assign(buttonData, {
            caption: e.target.value
         });

         buttonEditHandler(typeButton, buttonData, indexButton, true);
      }
   };

   getTriggers = () => {
      const {scenarioId} = this.props;
      const changedScenario = this.props.botScenarios.find(elem => elem.id === scenarioId);
      const triggers = [];

      changedScenario.triggers.forEach(trigger => {
         triggers.push({
            value: trigger.id,
            label: trigger.caption
         })
      });

      return triggers;
   };

   getSubscribeTriggers = () => {
      const {botScenarios, scenarioId} = this.props;
      const scenarios = botScenarios.find(data => data.id === scenarioId);
      const triggers = [];

      if (scenarios.destination !== 'subscription_message') {
         const subscribeDestination = botScenarios.find(data => data.destination === 'subscription_message');

         subscribeDestination && subscribeDestination.triggers.forEach(trigger => {
            triggers.push({
               value: trigger.id,
               label: trigger.caption
            })
         });

         return triggers;
      } else {
         return triggers;
      }
   };

   buttonChanger = () => {
      const {typeButton, buttonEditHandler, indexButton, buttonData, changedSocial} = this.props;

      if (typeButton === 'empty') {
         return (
            <div className={style.buttonBox}>
               <div className={style.buttonBoxHeader}>
                  <div className={style.buttonBoxHeaderDesc}>
                     <div>
                        <h2>Название кнопки</h2>
                     </div>
                  </div>
                  <div>
                     <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onBlur={e => this.editButton(e, true)}
                     />
                  </div>
               </div>
               <div
                  onClick={() => {
                     this.setState({isSendTextBtn: true});

                     buttonEditHandler(
                        buttonsTypes.text_buttons,
                        defaultValuesForNewButtons[buttonsTypes.text_buttons],
                        indexButton,
                        false,
                        true
                     )
                  }}
                  className={style.buttonBoxItem}
               >
                  <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                  Создать сообщение
               </div>

               {changedSocial === 'telegram' && (
                  <Fragment>
                     <div
                        onClick={() => {
                           buttonEditHandler(
                              buttonsTypes.url_buttons,
                              defaultValuesForNewButtons[buttonsTypes.url_buttons],
                              indexButton
                           )
                        }}
                        className={style.buttonBoxItem}
                     >
                        <FontAwesomeIcon icon={faLink} size="lg" color="dodgerblue"/>
                        Открыть веб-сайт
                     </div>
                     <div
                        onClick={() => {
                           buttonEditHandler(
                              buttonsTypes.call_buttons,
                              defaultValuesForNewButtons[buttonsTypes.call_buttons],
                              indexButton
                           )
                        }}
                        className={style.buttonBoxItem}
                     >
                        <FontAwesomeIcon icon={faPhoneAlt} size="lg" color="limegreen"/>
                        Добавить вызов
                     </div>
                  </Fragment>
               )}

               <div
                  onClick={() => {
                     buttonEditHandler(
                        buttonsTypes.trigger_buttons,
                        defaultValuesForNewButtons[buttonsTypes.fast_buttons],
                        indexButton
                     )
                  }}
                  className={style.buttonBoxItem}
               >
                  <FontAwesomeIcon icon={faHandPointUp} size="lg" color="limegreen"/>
                  Выберите существующий шаг
               </div>

               <Controls
						styles={{marginTop: "20px"}}
                  {...this.props}
               />
            </div>
         )
      } else if (typeButton === buttonsTypes.text_buttons) {
         return (
            <div className={style.buttonBox}>
               <div className={style.buttonBoxHeader}>
                  <div className={style.buttonBoxHeaderDesc}>
                     <div>
                        <h2>Название кнопки</h2>
                     </div>
                  </div>
                  <div>
                     <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onBlur={e => this.editButton(e, true)}
                     />
                  </div>
               </div>

               <div className={style.buttonBoxInfo}>
                  <div className={style.buttonBoxInfoContainer}>
                     <div className={style.buttonBoxInfoContainerText} onClick={() =>
                        buttonData.payload.trigger_id.length !== 0 ? this.props.changeTriggerId(buttonData.payload.trigger_id) : {}
                     }>
                        <div>
                           <FontAwesomeIcon icon={faLink} size="lg" color="dodgerblue"/>
                        </div>

                        <div className={style.buttonBoxInfoContainerActions}>
                           <p className={style.buttonBoxInfoContainerActionsTitle}>Отправить сообщение</p>
                           <p className={style.buttonBoxInfoContainerActionsDesc}>{buttonData.createdTrigger && buttonData.createdTrigger.length !== 0 ? buttonData.createdTrigger.caption : 'загрузка ...'}</p>
                        </div>
                     </div>

                     <div
                        className={style.buttonBoxInfoContainerIcon}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>
					
               <Controls
						styles={{marginTop: "20px"}}
                  {...this.props}
               />
            </div>
         )
      } else if (typeButton === buttonsTypes.url_buttons) {
         return (
            <div className={style.buttonBox}>
               <div className={style.buttonBoxHeader}>
                  <div className={style.buttonBoxHeaderDesc}>
                     <div>
                        <h2>Название кнопки</h2>
                     </div>
                  </div>
                  <div>
                     <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onBlur={e => this.editButton(e, true)}
                     />
                  </div>
               </div>
               <div className={style.buttonBoxInfo}>
                  <div className={style.buttonBoxInfoContainer}>
                     <div className={style.buttonBoxInfoContainerText}>
                        <FontAwesomeIcon icon={faLink} size="lg" color="dodgerblue"/>

                        <div className={style.buttonBoxInfoContainerActions}>
                           <p className={style.buttonBoxInfoContainerActionsTitle}>Открыть веб-сайт</p>
                           <p className={style.buttonBoxInfoContainerActionsDesc}>Введите URL ниже</p>
                        </div>
                     </div>

                     <div
                        className={style.buttonBoxInfoContainerIcon}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>

               <h2 className={style.descColor}>Адрес веб-сайта</h2>

               <input
                  type={'text'}
                  placeholder={'URL'}
                  defaultValue={buttonData.payload.url}
                  onBlur={this.editButton}
               />

               <Actions
                  {...this.props}
               />

               <Controls
                  {...this.props}
               />
            </div>
         )
      } else if (typeButton === buttonsTypes.call_buttons) {
         return (
            <div className={style.buttonBox}>
               <div className={style.buttonBoxHeader}>
                  <div className={style.buttonBoxHeaderDesc}>
                     <div>
                        <h2>Название кнопки</h2>
                     </div>
                  </div>
                  <div>
                     <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onBlur={(e) => this.editButton(e, true)}
                     />
                  </div>
               </div>
               <div className={style.buttonBoxInfo}>
                  <div className={style.buttonBoxInfoContainer}>
                     <div className={style.buttonBoxInfoContainerText}>
                        <FontAwesomeIcon icon={faPhoneAlt} size="lg" color="limegreen"/>

                        <div className={style.buttonBoxInfoContainerActions}>
                           <p className={style.buttonBoxInfoContainerActionsTitle}>Наберите номер</p>
                           <p className={style.buttonBoxInfoContainerActionsDesc}>Введите номер ниже</p>
                        </div>
                     </div>

                     <div
                        className={style.buttonBoxInfoContainerIcon}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>

               <h2 className={style.descColor}>Телефон</h2>
               <input
                  type={'tel'}
                  placeholder={'+7'}
                  defaultValue={buttonData.payload.call}
                  onBlur={this.editButton}
               />
					
               <Controls
						styles={{marginTop: "20px"}}
                  {...this.props}
               />
            </div>
         )
      } else if (typeButton === buttonsTypes.trigger_buttons) {
         return (
            <div className={style.buttonBox}>
               <div className={style.buttonBoxHeader}>
                  <div className={style.buttonBoxHeaderDesc}>
                     <div>
                        <h2>Название кнопки</h2>
                     </div>
                  </div>
                  <div>
                     <input
                        type={'text'}
                        defaultValue={buttonData.caption}
                        placeholder={'title'}
                        onBlur={(e) => this.editButton(e, true)}
                     />
                  </div>
               </div>
               <div className={style.buttonBoxInfo}>
                  <div className={style.buttonBoxInfoSelectContainer}>
                     <Select
                        className={`${style.selector} buttonsMenuSelector`}
                        defaultValue={(buttonData.payload.trigger_id) || 'Выберите сообщение'}
                        placeholder="Выберите сообщение"
                        onChange={(value) => this.editButton({
                           target: {
                              value: value
                           }
                        })}
                     >
                        <OptGroup label="Сообщений">
                        {this.getTriggers().filter(trigger => trigger.value !== buttonData.boundTriggerId).map(item => (
                           <Option value={item.value}>{item.label}</Option>
                        ))}
                        </OptGroup>

                        <OptGroup label="Реакция на подписку">
                        {this.getSubscribeTriggers().map(item => (
                           <Option value={item.value}>{item.label}</Option>
                        ))}
                        </OptGroup>
                     </Select>

                     <div
                        className={style.buttonBoxInfoContainerIcon}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>
					
               <Controls
						styles={{marginTop: "20px"}}
                  {...this.props}
               />
            </div>
         )
      }
   };

   render() {
      return (
         <div className={style.buttonMenu}>
            {this.buttonChanger()}
         </div>
      )
   }
}

const mapStateToProps = ({singleBotReducers}) => ({
   changedScenarioId: singleBotReducers.changedScenarioId,
   createdTriggerId: singleBotReducers.createdTriggerId,
   changedSocial: singleBotReducers.changedSocial,
   botScenarios: singleBotReducers.botScenarios,
   isFetching: singleBotReducers.isFetching,
   error: singleBotReducers.error,
});

export default connect(mapStateToProps)(ButtonsMenu)
