import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {Select, InputNumber} from 'antd';

import TextArea from "../textArea/textArea";
import CustomFlatPicker from './customFlatPicker/customFlatPicker';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ConditionsForElements from "../conditionsForElements/conditionsForElements";

import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import {timeToSeconds, secondsToTime} from "../../../utils/formatSecond";
import {updateTrigger} from "../../../actions/actionCreator";

import style from './timerElement.module.sass';

const {Option} = Select;

const TimerElement = props => {
   const [dayField, setDayField] = useState('');
   const [hoursField, setHoursField] = useState('');
   const [minField, setMinField] = useState('');

   const [pauseKeyField, setPauseKeyField] = useState({
      keyValue: '',
      key: ''
   });

   const [pauseDayField, setPauseDayField] = useState('');
   const [pauseHoursField, setPauseHoursField] = useState('');
   const [pauseMinField, setPauseMinField] = useState('');
   const [pauseSecField, setPauseSecField] = useState('');

   const {type, index, value, changedTrigger} = props;

   const valuesForTimer = Object.values(value)[0];

   useEffect(() => {
      if (Object.keys(valuesForTimer)[0] === 'pause_delay') {
         if (pauseKeyField.key === 'day') {
            setPauseDayField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (pauseKeyField.key === 'hours') {
            setPauseHoursField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (pauseKeyField.key === 'min') {
            setPauseMinField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (pauseKeyField.key === 'sec') {
            setPauseSecField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         }
      }
   }, [pauseKeyField]);

   useEffect(() => {
      if (Object.keys(valuesForTimer)[0] === 'pause_delay') {
         if (valuesForTimer.format.key === 'day') {
            setPauseDayField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (valuesForTimer.format.key === 'hours') {
            setPauseHoursField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (valuesForTimer.format.key === 'min') {
            setPauseMinField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         } else if (valuesForTimer.format.key === 'sec') {
            setPauseSecField(secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key))
         }

         setPauseKeyField({
            keyValue: valuesForTimer.format.keyValue,
            key: valuesForTimer.format.key
         })
      }
   }, []);

   const updateTrigger = (e, typeInput) => {
      const messagesCopy = changedTrigger.messages;

      if (typeInput === 'pause_delay') {
         Object.assign(messagesCopy[props.changedSocial][index].timer, {
            [typeInput]: e.target.value,
            format: e.target.format
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

   const handleSendTime = (valuesForTimer, key) => {
      if (dayField.length !== 0 || hoursField.length !== 0 || minField.length !== 0) {
         const dateObject = {
            target: {
               value: {
                  day: (dayField === '') ? timeToSeconds(valuesForTimer.send_time.day, key) : dayField,
                  hours: (hoursField === '') ? timeToSeconds(valuesForTimer.send_time.hours, key) : hoursField,
                  min: (minField === '') ? timeToSeconds(valuesForTimer.send_time.min, key) : minField,
               }
            }
         };

         updateTrigger(dateObject, 'send_time')
      }
   };

   const handleSendPause = time => {
      const pauseObject = {
         target: {
            value: timeToSeconds(time, pauseKeyField.key),
            format: {
               keyValue: pauseKeyField.keyValue,
               key: pauseKeyField.key,
            }
         }
      };

      updateTrigger(pauseObject, 'pause_delay');
   };

   if (Object.keys(valuesForTimer)[0] === 'pause_delay') {
      return (
         <div className={style.mainContentContainer}>
				<ConditionsForElements/>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
               />
            </div>
            <div className={style.mainContainer}>
               <p>Используйте этот блок, чтобы добавить задержку в работе цепочки</p>

               <form>
                  <div className={style.pauseContainer}>
                     <InputNumber
                        min={0}
                        type="number"
                        defaultValue={secondsToTime(valuesForTimer.pause_delay, valuesForTimer.format.key)}
                        onBlur={() => {
                           if (pauseKeyField.key === 'day') {
                              handleSendPause(pauseDayField)
                           } else if (pauseKeyField.key === 'hours') {
                              handleSendPause(pauseHoursField)
                           } else if (pauseKeyField.key === 'min') {
                              handleSendPause(pauseMinField)
                           } else if (pauseKeyField.key === 'sec') {
                              handleSendPause(pauseSecField)
                           }
                        }}
                        onChange={value => {
                           if (pauseKeyField.key === 'day') {
                              const result = secondsToTime(value, pauseKeyField.key);
                              setPauseDayField(result);
                           } else if (pauseKeyField.key === 'hours') {
                              const result = secondsToTime(value, pauseKeyField.key);
                              setPauseHoursField(result);
                           } else if (pauseKeyField.key === 'min') {
                              const result = secondsToTime(value, pauseKeyField.key);
                              setPauseMinField(result);
                           } else if (pauseKeyField.key === 'sec') {
                              const result = secondsToTime(value, pauseKeyField.key);
                              setPauseSecField(result);
                           }
                        }}
                        className={style.pauseContainerInput}
                     />

                     <Select
                        className={style.pauseContainerSelect}
                        placeholder="Выберите время"
                        defaultValue={valuesForTimer.format.keyValue}
                        onBlur={() => {
                           if (pauseKeyField.key === 'day') {
                              handleSendPause(pauseDayField)
                           } else if (pauseKeyField.key === 'hours') {
                              handleSendPause(pauseHoursField)
                           } else if (pauseKeyField.key === 'min') {
                              handleSendPause(pauseMinField)
                           } else if (pauseKeyField.key === 'sec') {
                              handleSendPause(pauseSecField)
                           }
                        }}
                        onChange={(value, {props}) => {
                           setPauseKeyField({
                              keyValue: props.children,
                              key: props.value,
                           });
                        }}
                     >
                        <Option value="sec">Секунд</Option>
                        <Option value="min">Минут</Option>
                        <Option value="hours">Час</Option>

                        <Option value="day">День</Option>
                     </Select>
                  </div>
               </form>
            </div>
         </div>
      )
   } else if (Object.keys(valuesForTimer)[0] === 'activity_lost') {
      return (
         <div className={style.mainContentContainer}>
				<ConditionsForElements/>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
               />
            </div>
            <div className={style.datePickerContainer}>
               <div className={style.datePickerTitle}>
                  <p>Ждать до</p>
                  <p>Дата / Время</p>
               </div>
               <CustomFlatPicker
                  styleForPicker={{
                     marginTop: "15px",
                     padding: "8px 15px"
                  }}
                  defaultValue={
                     formatUnixToDate(valuesForTimer[Object.keys(valuesForTimer)[0]], true)
                  }
                  onChange={(value) => {
                     const dateObject = {
                        target: {
                           value: formatDateToUnix(value[0])
                        }
                     };

                     updateTrigger(dateObject, 'activity_lost');
                  }}
               />
            </div>
         </div>
      )
   } else {
      return (
         <div className={style.mainContentContainer}>
				<ConditionsForElements/>
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
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
                              <InputNumber
                                 min={0}
                                 className={style.datePickerItemBox}
                                 type="number"
                                 defaultValue={valuesForTimer.send_time.day === ''
                                    ? 0
                                    : secondsToTime(valuesForTimer.send_time.day, 'day')
                                 }
                                 onBlur={() => handleSendTime(valuesForTimer, 'day')}
                                 onChange={value => {
                                    const result = secondsToTime(value, 'day');

                                    setDayField(
                                       ((value === null) || (value === ''))
                                          ? 0
                                          : timeToSeconds(secondsToTime(result, 'day'), 'day')
                                    )
                                 }}
                              />
                           </div>
                           <p>День</p>
                        </div>

                        <div className={style.datePickerItem}>
                           <div>
                              <InputNumber
                                 min={0}
                                 className={style.datePickerItemBox}
                                 type="number"
                                 defaultValue={valuesForTimer.send_time.hours === ''
                                    ? 0
                                    : secondsToTime(valuesForTimer.send_time.hours, 'hours')
                                 }
                                 onBlur={() => handleSendTime(valuesForTimer, 'hours')}
                                 onChange={value => {
                                    const result = secondsToTime(value, 'hours');

                                    setHoursField(
                                       ((value === null) || (value === ''))
                                          ? 0
                                          : timeToSeconds(secondsToTime(result, 'hours'), 'hours')
                                    )
                                 }}
                              />
                           </div>
                           <p>Час</p>
                        </div>

                        <div className={style.datePickerItem}>
                           <div>
                              <InputNumber
                                 min={0}
                                 className={style.datePickerItemBox}
                                 type="number"
                                 defaultValue={valuesForTimer.send_time.min === ''
                                    ? 0
                                    : secondsToTime(valuesForTimer.send_time.min, 'min')
                                 }
                                 onBlur={() => handleSendTime(valuesForTimer, 'min')}
                                 onChange={value => {
                                    const result = secondsToTime(value, 'min');

                                    setMinField(
                                       ((value === null) || (value === ''))
                                          ? 0
                                          : timeToSeconds(result, 'min')
                                    )
                                 }}
                              />
                           </div>
                           <p>Минут</p>
                        </div>
                     </div>

                     <p className={style.datePickerTextAreaTitle}>Тогда надо отправить сообщение:</p>

                     <TextArea
								hideCondition
                        componentType="send_time"
                        {...props}
                     />
                  </form>
               </div>
            </div>
         </div>
      )
   }
};

const mapStateToProps = ({singleBotReducers}) => ({
	changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(TimerElement);
