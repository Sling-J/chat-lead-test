import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import {updateBroadCasts} from "../../../actions/actionCreator";
import CustomFlatPicker from "../../messages/timerElement/customFlatPicker/customFlatPicker";

import {Dropdown, Spin} from 'antd';
import Button from '@material-ui/core/Button';
import style from './broadCastMenu.module.sass';

const BroadCastMenu = (props) => {
   const [isOpenTestTab, openTestTab] = useState(false);

   const {broadCastId, changedTrigger, isFetching} = props;

   const oldDate = new Date(2015, 0, 1).getTime();
   const futureTime = new Date().setFullYear(new Date().getFullYear() + 1);

   const DatePickerMenu = (
      <div className={style.calendarContainer}>
         <h2>Отложить рассылку</h2>

         <CustomFlatPicker
            styleForPicker={{
               width: '100%',
               padding: "8px 15px"
            }}
            defaultValue={
               formatUnixToDate(
                  props.broadCastData[broadCastId]
                     ? props.broadCastData[broadCastId].time : '',
                  true
               )
            }
            onChange={value => updateBroadCast({
               time: formatDateToUnix(value[0])
            })}
         />
      </div>
   );

   const getAllTagsInTrigger = () => {
      const allTags = [];

      changedTrigger.messages[props.changedSocial].forEach(message => {
         message.keyboard.forEach(button => {
            if (button.Add_Tags) {
               button.Add_Tags.forEach(tag => {
                  allTags.push(tag);
               });
            }
         });
      });

      return allTags;
   };

   const updateBroadCast = (broadCastUpdatedData) => {
      const broadCastDataCopy = props.broadCastData.concat();

      Object.assign(broadCastDataCopy[broadCastId], broadCastUpdatedData, {
         managerId: props.match.params.botId,
      });

      props.updateBroadcast(broadCastDataCopy[broadCastId]);
   };

   const sendBroadCastTab = () => (
      <div className={style.contentContainer}>
         <div className={style.userListBroadcast}>
            <div className={style.userListElement}>
               <h2>Выберете список получателей:</h2>
               <label htmlFor={'allUsers'}>
                  <input
                     type={'radio'}
                     id={'allUsers'}
                     name={'tagsChacker'}
                     onChange={() => updateBroadCast({tag: ''})}
                     defaultChecked={props.broadCastData[broadCastId] && props.broadCastData[broadCastId].tag.length === 0}
                  />
                  Все пользователи
                  ({props.broadCastData[broadCastId] && props.broadCastData[broadCastId].users_count} пользователей)
               </label>
               <label htmlFor={'allTags'}>
                  <input
                     type={'radio'}
                     id={'allTags'}
                     name={'tagsChacker'}
                     onChange={() => updateBroadCast({tag: getAllTagsInTrigger()})}
                     defaultChecked={props.broadCastData[broadCastId] && props.broadCastData[broadCastId].tag.length > 0}
                  />
                  Все теги
                  ({props.broadCastData[broadCastId] && props.broadCastData[broadCastId].users_count} пользователей)
               </label>
            </div>
         </div>
         <div className={style.options}>
            <div>
               <label htmlFor={'testBroadConfirm'}>
                  <input type={'checkbox'} id={'testBroadConfirm'}/> тестовая рассылка проверена
               </label>
               <label htmlFor={'broadCastEnd'}>
                  <input type={'checkbox'} id={'broadCastEnd'}/> уведомить об окончании рассылки
               </label>
            </div>
         </div>
         <div className={style.buttonsContainer}>
            <Button
               className={style.submitButton}
               variant="contained"
               onClick={() => updateBroadCast({
                  time: oldDate / 1000
               })}
            >
               Начать рассылку
            </Button>

            <p>или</p>

            <Dropdown overlay={DatePickerMenu} trigger={['click']} placement="topCenter">
               <Button className={style.putOffButton} variant="outlined">
                  Отложить рассылку
               </Button>
            </Dropdown>
         </div>
      </div>
   );

   const testTab = () => (
      <div className={style.contentContainer}>
         <div className={style.testBroadCastContainer}>
            <h2>Отправить тестовую рассылку пользователям:</h2>
            <p>Ссылка на страницу FB</p>
         </div>
         <div className={style.buttonsContainerTest}>
            <Button className={style.submitButton} variant="contained">
               Тестировать
            </Button>
         </div>
      </div>
   );

   return (
      <div className={style.mainContainer}>
         <ul className={`
            ${style.navigation}
            ${props.broadCastData[broadCastId] && props.broadCastData[broadCastId].sent && style.navigationSent}
         `}>
            <li
               className={!isOpenTestTab && style.activeNavigationElement}
               onClick={() => openTestTab(false)}
            >
               Отправка рассылки
            </li>
            {props.broadCastData[broadCastId] && !props.broadCastData[broadCastId].sent && (
               <li
                  className={isOpenTestTab && style.activeNavigationElement}
                  onClick={() => openTestTab(true)}
               >
                  Тест рассылки
               </li>
            )}
         </ul>
         <Spin spinning={isFetching}>
            {props.broadCastData[broadCastId] && props.broadCastData[broadCastId].sent ?
               (
                  <div className={style.completeMessage}>
                     Рассылка разослана!

                     <Button
                        className={style.submitButton}
                        variant="contained"
                        onClick={() => updateBroadCast({
                           sent: 'False',
                           time: futureTime / 1000
                        })}
                     >
                        Запустить новую рассылку
                     </Button>
                  </div>
               ) :
               (
                  isOpenTestTab
                     ? testTab()
                     : sendBroadCastTab()
               )
            }
         </Spin>
      </div>
   )
};

const mapStateToProps = ({broadCastReducers, singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
   broadCastData: broadCastReducers.broadCastData,
   isFetching: broadCastReducers.isFetching,
   error: broadCastReducers.error,
});

const mapDispatchToProps = dispatch => ({
   updateBroadcast: broadcastData => dispatch(updateBroadCasts(broadcastData))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BroadCastMenu);
