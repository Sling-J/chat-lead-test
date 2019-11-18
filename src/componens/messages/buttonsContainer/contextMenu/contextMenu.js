import React from 'react';
import style from './contextMenu.module.sass';
import {buttonsTypes, defaultValuesForNewButtons} from "../../../../constants/defaultValues";
import {connect} from "react-redux";
import onClickOutside from "react-onclickoutside";
import Actions from '../actions/actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faEnvelope, faPhoneAlt, faLink} from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import Controls from './controls/controls';
import TriggersModal from "../triggersModal/triggersModal";


const ContextMenu = (props) => {
   const [openTriggersModal, setOpenTriggersModal] = React.useState(false);

   const {
      buttonEditHandler,
      typeButton,
      scenarioId,
      indexButton,
      buttonData,
      setIndexOpenButton,
      styleForContextMenu,
      changedSocial
   } = props;
   const changedScenario = props.botScenarios.filter(elem => elem.id === scenarioId)[0];
   const changedTriggerInFastButton = typeButton === buttonsTypes.fast_buttons && (
      changedScenario.triggers.filter(elem => elem.id === buttonData.payload.trigger_id)[0]
   );

   const handleClickTriggersModal = () => {
      setOpenTriggersModal(true);
   };

   const handleClose = () => {
      setOpenTriggersModal(false);
   };

   const editButton = (e, forCaption) => {
      if (typeButton === buttonsTypes.text_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               trigger_text: e.target.value
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
               url: e.target.value
            })
         }

         buttonEditHandler(typeButton, buttonData, indexButton);

      } else if (typeButton === buttonsTypes.fast_buttons) {
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

      } else if (typeButton === buttonsTypes.call_buttons) {
         if (forCaption) {
            Object.assign(buttonData, {
               caption: e.target.value
            })
         } else {
            Object.assign(buttonData, {
               call: e.target.value
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

   const getBotScenarios = () => {
      const botScenarios = [];

      props.botScenarios.forEach(elem => {
         if (elem.destination === changedScenario.destination) {
            botScenarios.push({
               value: elem.trigger_text,
               label: elem.trigger_text
            })
         }
      });

      return botScenarios;
   };

   const getTriggers = () => {
      const triggers = [];

      changedScenario.triggers.map(trigger => {
         triggers.push({
            value: trigger.id,
            label: trigger.caption
         })
      });

      return triggers;
   };

   const stylesForSelector = {
      control: (styles, state) => ({
         ...styles,
         boxShadow: '0 !important',
         cursor: 'pointer',
         '&:hover': {
            border: '2px solid #bdcadd !important'
         },
         border: '2px solid #bdcadd',
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

   const buttonChanger = () => {
      if (typeButton === 'empty') {
         return (
            <>
               <div className={style.header}>
                  Редактировать кнопку
               </div>
               <div className={style.buttonChanger}>
                  <h2>Заголовок кнопки</h2>
                  <input
                     type={'text'}
                     defaultValue={buttonData.caption}
                     placeholder={'title'}
                     onInput={(e) => editButton(e, true)}
                  />
                  <div
                     onClick={() => {
                        buttonEditHandler(
                           buttonsTypes.text_buttons,
                           defaultValuesForNewButtons[buttonsTypes.text_buttons],
                           indexButton
                        )
                     }}
                     className={style.changerElement}
                  >
                     <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                     Создать сообщение
                  </div>
                  <div
                     onClick={() => {
                        buttonEditHandler(
                           buttonsTypes.url_buttons,
                           defaultValuesForNewButtons[buttonsTypes.url_buttons],
                           indexButton
                        )
                     }}
                     className={style.changerElement}
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
                     className={style.changerElement}
                  >
                     <FontAwesomeIcon icon={faPhoneAlt} size="lg" color="limegreen"/>
                     Добавить вызов
                  </div>

                  {(changedSocial === 'telegram' || changedSocial === 'facebook') && (
                     <div
                        onClick={() => {
                           handleClickTriggersModal(true);
                           buttonEditHandler(
                              buttonsTypes.fast_buttons,
                              defaultValuesForNewButtons[buttonsTypes.fast_buttons],
                              indexButton
                           )
                        }}
                        className={style.changerElement}
                     >
                        Выберите существующий шаг
                     </div>
                  )}

                  <Actions
                     {...props}
                  />
                  <Controls
                     {...props}
                  />
               </div>
            </>
         )
      } else if (typeButton === buttonsTypes.text_buttons) {
         return (
            <>
               <div className={style.header}>
                  Редактировать кнопку
               </div>
               <div className={style.buttonChanger}>
                  <h2>Заголовок кнопки</h2>
                  <input
                     type={'text'}
                     defaultValue={buttonData.caption}
                     placeholder={'title'}
                     onInput={(e) => editButton(e, true)}
                  />
                  <h2>Выберите команду:</h2>
                  <div className={style.inputContainer}>
                     <Select
                        placeholder={'Команда'}
                        options={getBotScenarios()}
                        defaultValue={buttonData.trigger_text && {
                           value: buttonData.trigger_text,
                           label: buttonData.trigger_text
                        }}
                        onChange={(value) => editButton({
                           target: {
                              value: value.value
                           }
                        })}
                        styles={stylesForSelector}
                        className={style.selector}
                        isSearchable={false}
                        components={{DropdownIndicator: () => null}}
                        // arrowRenderer={() => ''}
                     />
                     <div
                        className={style.closeButton}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
                  <Actions
                     {...props}
                  />
                  <Controls
                     {...props}
                  />

               </div>
            </>
         )
      } else if (typeButton === buttonsTypes.url_buttons) {
         return (
            <>
               <div className={style.header}>
                  Редактировать кнопку
               </div>
               <div className={style.buttonChanger}>
                  <h2>Заголовок кнопки</h2>
                  <input
                     type={'text'}
                     defaultValue={buttonData.caption}
                     placeholder={'title'}
                     onInput={(e) => editButton(e, true)}
                  />
                  <div className={style.inputContainer}>
                     <div className={style.closedButton}>Открыть веб-сайт</div>
                     <div
                        className={style.closeButton}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
                  <h2>Адрес веб-сайта</h2>
                  <input
                     type={'text'}
                     placeholder={'URL'}
                     defaultValue={buttonData.url}
                     onInput={editButton}
                  />

                  <Actions
                     {...props}
                  />
                  <Controls
                     {...props}
                  />
               </div>
            </>
         )

      } else if (typeButton === buttonsTypes.call_buttons) {
         return (
            <>
               <div className={style.header}>
                  Редактировать кнопку
               </div>
               <div className={style.buttonChanger}>
                  <h2>Заголовок кнопки</h2>
                  <input
                     type={'text'}
                     defaultValue={buttonData.caption}
                     placeholder={'title'}
                     onInput={(e) => editButton(e, true)}
                  />
                  <div className={style.inputContainer}>
                     <div className={style.closedButton}>Открыть номер телефона</div>
                     <div
                        className={style.closeButton}
                        onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                           caption: ''
                        }), indexButton, true)}
                     >
                        <FontAwesomeIcon icon={faTimes}/>
                     </div>
                  </div>
                  <h2>Номер телефона</h2>
                  <input
                     type={'tel'}
                     placeholder={'Телефон'}
                     defaultValue={buttonData.call}
                     onInput={editButton}
                  />

                  <Actions
                     {...props}
                  />
                  <Controls
                     {...props}
                  />
               </div>
            </>
         )
      } else if (typeButton === buttonsTypes.fast_buttons) {
         return (
            <>
               <TriggersModal
                  open={openTriggersModal}
                  onClose={setOpenTriggersModal}
               />
               {/*<div className={style.header}>*/}
               {/*   Редактировать кнопку*/}
               {/*</div>*/}
               {/*<div className={style.buttonChanger}>*/}
               {/*   <h2>Заголовок кнопки</h2>*/}
               {/*   <input*/}
               {/*      type={'text'}*/}
               {/*      defaultValue={buttonData.caption}*/}
               {/*      title={'title'}*/}
               {/*      onInput={(e) => editButton(e, true)}*/}
               {/*   />*/}
               {/*   <div className={style.inputContainer}>*/}
               {/*      <Select*/}
               {/*         placeholder={'Триггер'}*/}
               {/*         options={getTriggers()}*/}
               {/*         defaultValue={buttonData.payload.trigger_id && {*/}
               {/*            value: buttonData.payload.trigger_id,*/}
               {/*            label: changedTriggerInFastButton.caption*/}
               {/*         }}*/}
               {/*         onChange={(value) => editButton({*/}
               {/*            target: {*/}
               {/*               value: value.value*/}
               {/*            }*/}
               {/*         })}*/}
               {/*         styles={stylesForSelector}*/}
               {/*         className={style.selector}*/}
               {/*         isSearchable={false}*/}
               {/*         components={{DropdownIndicator: () => null}}*/}
               {/*         // arrowRenderer={() => ''}*/}
               {/*      />*/}
               {/*      <div*/}
               {/*         className={style.closeButton}*/}
               {/*         onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {*/}
               {/*            caption: ''*/}
               {/*         }), indexButton, true)}*/}
               {/*      >*/}
               {/*         <FontAwesomeIcon icon={faTimes}/>*/}
               {/*      </div>*/}
               {/*   </div>*/}
               {/*   <Actions*/}
               {/*      {...props}*/}
               {/*   />*/}
               {/*   <Controls*/}
               {/*      {...props}*/}
               {/*   />*/}
               {/*</div>*/}
            </>
         )
      }
   };

   ContextMenu.handleClickOutside = () => setIndexOpenButton(false);


   return (
      <div className={style.mainContainer} style={styleForContextMenu}>
         {buttonChanger()}
      </div>
   )
};

const clickOutsideConfig = {
   handleClickOutside: () => ContextMenu.handleClickOutside
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedScenarioId: singleBotReducers.changedScenarioId,
   changedSocial: singleBotReducers.changedSocial,
   botScenarios: singleBotReducers.botScenarios,
   isFetching: singleBotReducers.isFetching,
   error: singleBotReducers.error,
});

export default onClickOutside(connect(mapStateToProps)(ContextMenu), clickOutsideConfig);
