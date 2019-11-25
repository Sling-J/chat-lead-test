import React, {useState} from 'react';
import style from './timerElement.module.sass';
import {updateTrigger} from "../../../actions/actionCreator";
import "react-datepicker/dist/react-datepicker.css";
import './calendarStyle.sass';
import {connect} from "react-redux";
import {registerLocale} from 'react-datepicker';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
import ClickOutsideHandler from "../../hoc/clickOutside";
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ru from "date-fns/locale/ru";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import locale from 'antd/es/date-picker/locale/ru_RU';

import { DatePicker as AntdDatePicker } from 'antd';
import { Select, InputNumber } from 'antd';
import TimerTextArea from "./timerTextArea/timerTextArea";
import moment from 'moment';
import 'moment/locale/ru';

registerLocale("ru", ru);

const { Option } = Select;

const TimerElement = props => {
   const [isOpenWindow, setStatusIsOpenWindow] = useState(false);
   const [dayField, setDayField] = useState('');
   const [hoursField, setHoursField] = useState('');
   const [minField, setMinField] = useState('');
   const [pauseInputValue, setPauseInputValue] = useState({
      value: '1'
   });
   const [pauseInputKey, setPauseInputKey] = useState({
      key: 'sec',
      value: 'секунды'
   });
   
   const {type, index, value, changedTrigger} = props;

   const valuesForTimer = Object.values(value)[0];

   const updateTrigger = (e, typeInput) => {
      const messagesCopy = changedTrigger.messages;

      if (typeInput === 'pause_delay') {
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

   const handleSendTime = event => {
      event.preventDefault();

      if (dayField.length !== 0 || hoursField.length !== 0 || minField.length !== 0) {
         const dateObject = {
            target: {
               value: {
                  day: dayField,
                  hours: hoursField,
                  min: minField,
               }
            }
         };

         updateTrigger(dateObject, 'send_time')
      }
   };

   const handleSendPause = (isValue, data, valuesForTimer) => {
      let pauseObject;

      if (isValue) {
         pauseObject = {
            target: {
               value: {
                  value: data,
                  key: valuesForTimer.pause_delay.key,
                  keyValue: valuesForTimer.pause_delay.keyValue,  
               }
            }
         }
      } else {
         pauseObject = {
            target: {
               value: {
                  value: valuesForTimer.pause_delay.value,
                  key: data.value,
                  keyValue: data.children,
               }
            }
         }
      }

      updateTrigger(pauseObject, 'pause_delay');
   }

   if (Object.keys(valuesForTimer)[0] === 'pause_delay') {
      return (
         <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '-25px', left: '330px'}}
               />
            </div>
            <div className={style.mainContainer}>
               <p>Используйте этот блок, чтобы добавить задержку в работе цепочки</p>

               <form>
                  <div className={style.pauseContainer}>
                     <InputNumber 
                        min={1}
                        max={10}
                        defaultValue={valuesForTimer.pause_delay.value}
                        onChange={(value) => handleSendPause(true, value, valuesForTimer)}
                        className={style.pauseContainerInput}
                     />

                     <Select
                        className={style.pauseContainerSelect}
                        placeholder="Выберите время"
                        defaultValue={valuesForTimer.pause_delay.keyValue}
                        onChange={(value, {props}) => handleSendPause(false, {children: props.children, value: props.value}, valuesForTimer)}
                     >
                        <Option value="sec">секунды</Option>
                        <Option value="min">минуты</Option>
                        <Option value="hours">час</Option>
                     </Select>
                  </div>
               </form>
            </div>
         </div>
      )
   } else if (Object.keys(valuesForTimer)[0] === 'activity_lost') {
      return (
         <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '-25px', left: '330px'}}
               />
            </div>
            <div className={style.datePickerContainer}>
               <div className={style.datePickerTitle}>
                  <p>Ждать до</p>
                  <p>Дата / Время</p>
               </div>
               <AntdDatePicker
                  showTime
                  locale={locale}
                  className={style.datePickerAntd}
                  placeholder="Выберите время"
                  defaultValue={
                     moment(formatUnixToDate(valuesForTimer[Object.keys(valuesForTimer)[0]], true), 'YYYY-MM-DD, h:mm')
                  }
                  onChange={(value) => {
                     const dateObject = {
                        target: {
                           value: formatDateToUnix(value)
                        }
                     };

                     updateTrigger(dateObject, 'activity_lost')
                  }}

                  disabledDate={(current) => current && current < moment().endOf('day')}
               />
            </div>
         </div>
      )
   } else {
      return (
         <div className={style.mainContentContainer}>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
                  styleForBar={{top: '0px', left: '330px'}}
               />
            </div>

            <div className={style.datePickerContainerAuto}>
               <div className={style.datePickerTitle}>
                  <p>Если нет активности через:</p>
               </div>
               <div>
                  <form>
                     <div className={style.datePickerBox}>
                        <div className={style.datePickerItem}>
                           <div>
                              <input
                                 type="number"
                                 placeholder="день"
                                 defaultValue={valuesForTimer.send_time.day}
                                 onBlur={handleSendTime}
                                 onChange={e => setDayField(e.target.value)}
                              />
                           </div>
                           <p>Дней</p>
                        </div>

                        <div className={style.datePickerItem}>
                           <div>
                              <input
                                 type="number"
                                 placeholder="час"
                                 defaultValue={valuesForTimer.send_time.hours}
                                 onBlur={handleSendTime}
                                 onChange={e => setHoursField(e.target.value)}
                              />
                           </div>
                           <p>Часов</p>
                        </div>

                        <div className={style.datePickerItem}>
                           <div>
                              <input
                                 type="number"
                                 placeholder="минуты"
                                 defaultValue={valuesForTimer.send_time.min}
                                 onBlur={handleSendTime}
                                 onChange={e => setMinField(e.target.value)}
                              />
                           </div>
                           <p>Минуты</p>
                        </div>
                     </div>

                     <p className={style.datePickerTextAreaTitle}>Тогда надо отправить сообщение:</p>

                     <TimerTextArea optionalType="send_time" {...props}/>
                  </form>
               </div>
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
