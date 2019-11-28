import React, {useState} from 'react';
import style from './broadCastMenu.module.sass';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import DatePicker, {registerLocale} from 'react-datepicker';
import './calendarStyle.sass';
import {updateBroadCasts} from "../../../actions/actionCreator";
import ClickOutsideHandler from "../../hoc/clickOutside";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru"; // the locale you want
registerLocale("ru", ru);


const BroadCastMenu = (props) => {
   const {broadCastId, changedTrigger} = props;
   const [isOpenTestTab, openTestTab] = useState(false);
   const [isOpenCalendar, openCalendar] = useState(false);
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
            <div className={style.putOffButton} onClick={() => openCalendar(true)}>
               Отложить рассылку
            </div>
            <ClickOutsideHandler onClickedOutside={() => openCalendar(false)}>
               <div className={style.delayContainer}>
                  {
                     isOpenCalendar && (
                        <div className={style.calendarContainer}>
                           <h2>Отложить рассылку</h2>
                           <DatePicker
                              selected={new Date(props.broadCastData[broadCastId].time * 1000)}
                              dateFormat={'yyyy-MM-dd'}
                              locale={ru}
                              onChange={(date) => {
                                 const dateData = new Date(date);
                                 updateBroadCast({
                                    time: dateData.getTime() / 1000,
                                    // sent: 'False'*/
                                 });
                                 // console.log(date.getTime() / 1000);
                              }}
                              minDate={new Date()}
                              className={style.datePickerInput}
                           />
                        </div>
                     )
                  }
               </div>
            </ClickOutsideHandler>
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
         {
            props.broadCastData[broadCastId].sent ?
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
               (isOpenTestTab ? testTab() : sendBroadCastTab())
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
