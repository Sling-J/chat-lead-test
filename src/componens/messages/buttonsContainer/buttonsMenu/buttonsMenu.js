import React, {Component, Fragment} from 'react';
import {buttonsTypes, defaultValuesForNewButtons} from "../../../../constants/defaultValues";
import {connect} from "react-redux";
import Actions from '../actions/actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faEnvelope,
   faPhoneAlt,
   faLink,
   faHandPointUp,
   faTimes
} from "@fortawesome/free-solid-svg-icons";

import {Select} from 'antd'
import Controls from './controls/controls';

import style from '../../../../styles/messageButtons.module.scss';

const {Option} = Select;

class ButtonsMenu extends Component {
   state = {
      isSendTextBtn: false
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
               trigger: createdTrigger
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
                  trigger_id: e.target.value,
               }
            })
         }

         buttonEditHandler(buttonsTypes.text_buttons, buttonData, indexButton, false, false, buttonsTypes.text_buttons);
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

         buttonEditHandler(buttonsTypes.url_buttons, buttonData, indexButton, false, false, buttonsTypes.url_buttons);
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

         buttonEditHandler(buttonsTypes.call_buttons, buttonData, indexButton, false, false, buttonsTypes.call_buttons);
      } else if (typeButton === buttonsTypes.trigger_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               createdTrigger: e.target.trigger,
               payload: {
                  trigger_id: e.target.value,
               }
            })
         }

         buttonEditHandler(buttonsTypes.text_buttons, buttonData, indexButton, false, false, buttonsTypes.trigger_buttons);
      } else if (typeButton === 'empty') {
         Object.assign(buttonData, {
            caption: e.target.value
         });

         buttonEditHandler(buttonsTypes.text_buttons, buttonData, indexButton, true, false, buttonsTypes.text_buttons);
      }
   };

   getTriggers = () => {
      const {scenarioId} = this.props;
      const changedScenario = this.props.botScenarios.filter(elem => elem.id === scenarioId)[0];
      const triggers = [];

      changedScenario.triggers.forEach(trigger => {
         triggers.push({
            value: trigger.id,
            label: trigger.caption
         })
      });

      return triggers;
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
                        onInput={(e) => this.editButton(e, true)}
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
                        true,
                        buttonsTypes.text_buttons,
                     )
                  }}
                  className={style.buttonBoxItem}
               >
                  <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                  Создать сообщение
               </div>

               {(changedSocial === 'facebook' || changedSocial === 'telegram') && (
                  <Fragment>
                     <div
                        onClick={() => {
                           buttonEditHandler(
                              buttonsTypes.url_buttons,
                              defaultValuesForNewButtons[buttonsTypes.url_buttons],
                              indexButton,
                              false,
                              false,
                              buttonsTypes.url_buttons,
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
                              indexButton,
                              false,
                              false,
                              buttonsTypes.call_buttons,
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
                        buttonsTypes.text_buttons,
                        defaultValuesForNewButtons[buttonsTypes.text_buttons],
                        indexButton,
                        false,
                        false,
                        buttonsTypes.trigger_buttons
                     )
                  }}
                  className={style.buttonBoxItem}
               >
                  <FontAwesomeIcon icon={faHandPointUp} size="lg" color="limegreen"/>
                  Выберите существующий шаг
               </div>

               <Actions
                  {...this.props}
               />
               <Controls
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
                        onInput={(e) => this.editButton(e, true)}
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
                        }), indexButton, true, false, buttonsTypes.text_buttons)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>
               <Actions
                  {...this.props}
               />
               <Controls
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
                        onInput={(e) => this.editButton(e, true)}
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
                        }), indexButton, true, false, buttonsTypes.url_buttons)}
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
                  onInput={this.editButton}
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
                        onInput={(e) => this.editButton(e, true)}
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
                        }), indexButton, true, false, buttonsTypes.call_buttons)}
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
                  onInput={this.editButton}
               />

               <Actions
                  {...this.props}
               />
               <Controls
                  {...this.props}
               />
            </div>
         )
      } else if (typeButton === buttonsTypes.trigger_buttons) {
         const stylesForSelector = {
            control: (styles) => ({
               ...styles,
               boxShadow: '0 !important',
               cursor: 'pointer',
               border: '1px dashed #bdcadd',
               borderRight: 'none',
               borderRadius: '10px 0 0 10px',
               height: '100%',
               background: '#f1f3f5'
            }),
            option: (styles, {data, isDisabled, isFocused, isSelected}) => {
               return {
                  ...styles,
                  color: '#000',
                  backgroundColor: isSelected ? '#f4f3f5' : 'white',
                  cursor: 'pointer',
                  borderRadius: '0'
               };
            }
         };

         const changedScenario = this.props.botScenarios.filter(elem => elem.id === this.props.scenarioId)[0];
         const changedTriggerInTriggerButton = typeButton === buttonsTypes.trigger_buttons && (
            changedScenario.triggers.filter(elem => elem.id === buttonData.payload.trigger_id)[0]
         );

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
                        onInput={(e) => this.editButton(e, true)}
                     />
                  </div>
               </div>
               <div className={style.buttonBoxInfo}>
                  <div className={style.buttonBoxInfoSelectContainer}>
                     <Select
                        className={style.selector}
                        defaultValue={(buttonData.payload.trigger_id && changedTriggerInTriggerButton.caption) || 'Выберите сообщение'}
                        placeholder="Выберите сообщение"
                        onChange={(value) => this.editButton({
                           target: {
                              value: value
                           }
                        })}
                     >
                        {this.getTriggers().filter(trigger => trigger.value !== buttonData.boundTriggerId).map(item => (
                           <Option value={item.value}>{item.label}</Option>
                        ))}
                     </Select>
                     <div
                        className={style.buttonBoxInfoContainerIcon}
                        onClick={() => buttonEditHandler(buttonsTypes.text_buttons, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true, false, buttonsTypes.trigger_buttons)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
               </div>
               <Actions
                  {...this.props}
               />
               <Controls
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

export default connect(mapStateToProps)(ButtonsMenu);