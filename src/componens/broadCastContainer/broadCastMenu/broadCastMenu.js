import React, {useState} from 'react';
import style from './broadCastMenu.module.sass';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import './calendarStyle.sass';
import {updateBroadCasts} from "../../../actions/actionCreator";
import "react-datepicker/dist/react-datepicker.css";
import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import CustomFlatPicker from "../../messages/timerElement/customFlatPicker/customFlatPicker"; // the locale you want
import {Dropdown} from 'antd';

const BroadCastMenu = (props) => {
   const {broadCastId, changedTrigger} = props;
   const [isOpenTestTab, openTestTab] = useState(false);
   const oldDate = new Date(2015, 0, 1).getTime();
   const futureTime = new Date().setFullYear(new Date().getFullYear() + 1);

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

   const DatePickerMenu = (
      <div className={style.delayContainer}>
         <div className={style.calendarContainer}>
            <h2>Отложить рассылку</h2>

            <CustomFlatPicker
               styleForPicker={{
                  width: '80%',
                  padding: "8px 15px"
               }}
               defaultValue={
                  formatUnixToDate(props.broadCastData[broadCastId].time, true)
               }
               onChange={value => updateBroadCast({
                  time: formatDateToUnix(value[0])
               })}
            />
         </div>
      </div>
   );

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
                     defaultChecked={props.broadCastData[broadCastId].tag.length === 0}
                  />
                  Все пользователи({props.broadCastData[broadCastId].users_count} пользователей)
               </label>
               <label htmlFor={'allTags'}>
                  <input
                     type={'radio'}
                     id={'allTags'}
                     name={'tagsChacker'}
                     onChange={() => updateBroadCast({tag: getAllTagsInTrigger()})}
                     defaultChecked={props.broadCastData[broadCastId].tag.length > 0}
                  />
                  Все теги({props.broadCastData[broadCastId].users_count} пользователей)
               </label>
            </div>
         </div>
         <div className={style.options}>
            <div>
               <label htmlFor={'testBroadConfirm'}>
                  <input type={'checkbox'} id={'testBroadConfirm'}/>
                  тестовая рассылка проверена
               </label>
               <label htmlFor={'broadCastEnd'}>
                  <input type={'checkbox'} id={'broadCastEnd'}/>
                  уведомить об окончании рассылки
               </label>
            </div>
         </div>
         <div className={style.buttonsContainer}>
            <div className={style.submitButton} onClick={() => updateBroadCast({
               time: oldDate / 1000,
               // sent: 'False'
            })}>
               Начать рассылку
            </div>
            <p>или</p>
            <Dropdown className={style.datePickerMenu} overlay={DatePickerMenu} trigger={['click']}>
               <div className={style.putOffButton}>
                  Отложить рассылку
               </div>
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
            <div className={style.submitButton}>Тестрировать</div>
         </div>
      </div>
   );


   return (
      <div className={style.mainContainer}>
         <ul className={style.navigation}>
            <li
               className={isOpenTestTab ? style.navigationElement : style.activeNavigationElement}
               onClick={() => openTestTab(false)}
            >
               Отправка рассылки
            </li>
            <li
               className={isOpenTestTab ? style.activeNavigationElement : style.navigationElement}
               onClick={() => openTestTab(true)}
            >
               Тест рассылки
            </li>
         </ul>
         {props.broadCastData[broadCastId].sent ?
            (
               <div className={style.completeMessage}>
                  Рассылка разослана!
                  <div className={style.submitButton} onClick={() => updateBroadCast({
                     sent: 'False',
                     time: futureTime / 1000
                  })}>
                     Запустить новую рассылку
                  </div>
               </div>
            ) :
            (
               isOpenTestTab ? testTab() : sendBroadCastTab()
            )
         }
      </div>
   )
};

const mapStateToProps = state => {
   const {broadCastData, isFetching, error} = state.broadCastReducers;
   const {changedSocial} = state.singleBotReducers;


   return {
      broadCastData, isFetching, error, changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateBroadcast: (broadcastData) => dispatch(updateBroadCasts(broadcastData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadCastMenu));
