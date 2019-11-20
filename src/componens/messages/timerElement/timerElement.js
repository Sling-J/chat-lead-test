import React, {useState} from 'react';
import style from './timerElement.module.sass';
import {updateTrigger} from "../../../actions/actionCreator";
import "react-datepicker/dist/react-datepicker.css";
import './calendarStyle.sass';
import {connect} from "react-redux";
import DatePicker, {registerLocale} from 'react-datepicker';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
import ClickOutsideHandler from "../../hoc/clickOutside";
import moment from 'moment';
import ButtonsContainer from '../buttonsContainer/buttonsContainer';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ru from "date-fns/locale/ru";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons"; // the locale you want
import CalendarSelectTime from './calendarSelectTime/calendarSelectTime';

import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import {DatePicker as MaterialDatePicker} from "@material-ui/pickers";

registerLocale("ru", ru);


const TimerElement = (props) => {
   const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
   const {type, index, value, changedTrigger} = props;

   const valuesForTimer = Object.values(value)[0];

   const updateTrigger = (e, typeInput) => {
      const messagesCopy = changedTrigger.messages;

      if (typeInput === 'pause_delay') {
         if (e.target.value < 60 && e.target.value > 0) {
            Object.assign(messagesCopy[props.changedSocial][index].timer, {
               [typeInput]: e.target.value
            });

            const triggerData = {
               ...changedTrigger,
               index,
               type,
               messages: messagesCopy,
               botId: props.match.params.botId
            };

            props.updateTrigger(triggerData, null, props.changedSocial);
         }

      } else if (typeInput === 'activity_lost') {
         Object.assign(messagesCopy[props.changedSocial][index].timer, {
            [typeInput]: e.target.value
         });

         const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
         };

         props.updateTrigger(triggerData, null, props.changedSocial);

      } else {
         Object.assign(messagesCopy[props.changedSocial][index].timer, {
            [typeInput]: e.target.value
         });

         const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: props.match.params.botId
         };

         props.updateTrigger(triggerData, null, props.changedSocial);
      }
   };


   if (Object.keys(valuesForTimer)[0] === 'pause_delay') {
      return (
         <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '-25px', left: '320px'}}
               />
            </div>
            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
               {
                  <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                     <div className={style.container}>
                        <div
                           className={style.timerContainer}
                           onClick={() => setStatusIsOpenWindow(true)}
                        >
                           Задержка {valuesForTimer[Object.keys(valuesForTimer)[0]] || 0} секунды
                        </div>
                        {
                           isOpenWindow && (
                              <div className={style.messageContainer}>
                                 <div className={style.header}>
                                    Пауза
                                 </div>
                                 <div className={style.controlsContainer}>
                                    <label>Пауза</label>
                                    <div className={style.inputContainer}>
                                       <input
                                          type={'number'}
                                          value={valuesForTimer[Object.keys(valuesForTimer)[0]]}
                                          onInput={(e) => updateTrigger(e, 'pause_delay')}
                                       />
                                       <div className={style.buttonSetTime} onClick={(e) => {
                                          if (valuesForTimer[Object.keys(valuesForTimer)[0]] < 60) {
                                             updateTrigger({
                                                target: {
                                                   value: +valuesForTimer[Object.keys(valuesForTimer)[0]] + 1
                                                }
                                             }, 'pause_delay')
                                          }
                                       }}>
                                          <FontAwesomeIcon icon={faPlus}/>
                                       </div>
                                       <div className={style.buttonSetTime} onClick={(e) => {
                                          updateTrigger({
                                             target: {
                                                value: +valuesForTimer[Object.keys(valuesForTimer)[0]] - 1
                                             }
                                          }, 'pause_delay')
                                       }}>
                                          <FontAwesomeIcon icon={faMinus}/>
                                       </div>
                                    </div>
                                 </div>

                              </div>
                           )
                        }

                     </div>
                  </ClickOutsideHandler>
               }

            </div>
            {/*<ButtonsContainer*/}
            {/*{...props}*/}
            {/*/>*/}
         </div>
      )
   } else if (Object.keys(valuesForTimer)[0] === 'activity_lost') {
      return (

         <div className={style.mainContentContainer}>

            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '-25px', left: '320px'}}
                  // statusDraggable={(status) => setStatusDragable(status)}
               />
            </div>
            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
               {
                  <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                     <div className={style.container}>
                        <div
                           className={style.timerContainer}
                           onClick={() => setStatusIsOpenWindow(true)}
                        >
                           Ожидать
                           до {formatUnixToDate(valuesForTimer[Object.keys(valuesForTimer)[0]], 'activity_lost') || 0}
                        </div>
                        {
                           isOpenWindow && (
                              <div className={style.messageContainer}>
                                 <div className={style.header}>
                                    Ждать до
                                 </div>
                                 <div className={style.controlsContainer}>
                                    <label>Ждать до:</label>
                                    <div className={style.inputContainer}>
                                       <CalendarSelectTime
                                          {...props}
                                          valuesForTimer={valuesForTimer}
                                          updateTrigger={updateTrigger}
                                       />
                                    </div>

                                 </div>

                              </div>
                           )
                        }

                     </div>
                  </ClickOutsideHandler>
               }

            </div>
            {/*<ButtonsContainer*/}
            {/*{...props}*/}
            {/*/>*/}
         </div>
      )
   } else {
      return (
         <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '-25px', left: '320px'}}
               />
            </div>
            <div className={style.mainContainer} onClick={() => setStatusIsOpenWindow(true)}>
               {
                  <ClickOutsideHandler onClickedOutside={() => setStatusIsOpenWindow(false)}>
                     <div className={style.container}>
                        <div
                           className={style.timerContainer}
                        >
                           Потеря активности
                           до {formatUnixToDate(valuesForTimer[Object.keys(valuesForTimer)[0]], 'send_time') || 0}
                        </div>
                        {
                           isOpenWindow && (
                              <div className={style.messageContainer}>
                                 <div className={style.header}>
                                    Потеря активности
                                 </div>
                                 <div className={style.controlsContainer}>
                                    <label>Потеря активности</label>
                                    <div className={style.inputContainer}>
                                       <DatePicker
                                          selected={
                                             new Date(
                                                formatUnixToDate(
                                                   valuesForTimer[Object.keys(valuesForTimer)[0]],
                                                   'send_time',
                                                   true
                                                )
                                             )
                                          }
                                          dateFormat={'yyyy-MM-dd'}
                                          locale={ru}
                                          onChange={(date) => {
                                             const dateObject = {
                                                target: {
                                                   value: formatDateToUnix(date)
                                                }
                                             };

                                             updateTrigger(dateObject, 'send_time')
                                          }}
                                          minDate={new Date()}
                                          className={style.datePickerInput}
                                       />
                                    </div>
                                 </div>

                              </div>
                           )
                        }

                     </div>
                  </ClickOutsideHandler>
               }

            </div>
         </div>
      )
   }

};


const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimerElement));
