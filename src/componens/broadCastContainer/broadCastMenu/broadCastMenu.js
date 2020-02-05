import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import CustomFlatPicker from "../../messages/timerElement/customFlatPicker/customFlatPicker";
import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import {updateBroadCasts} from "../../../actions/actionCreator";

import {Popover, Spin, Checkbox, Radio} from 'antd';
import Button from '@material-ui/core/Button';

import style from './broadCastMenu.module.sass';

const BroadCastMenu = props => {
   const {broadCastId, isFetching, broadCastData} = props;

   const [visible, setVisible] = useState(false);
   const [isOpenTestTab, openTestTab] = useState(false);

   const handleVisibleChange = visible => {
      setVisible(visible);
   };

   const futureTime = new Date().setFullYear(new Date().getFullYear() + 1);
   const oldDate = new Date(2015, 0, 1).getTime();

   const activeBroadCast = broadCastData.find(item => item.id === broadCastId);

   const DatePickerMenu = (
      <div className={style.calendarContainer}>
         <h2>Отложить рассылку</h2>

         <CustomFlatPicker
            styleForPicker={{
               width: '100%',
               padding: "8px 15px",
            }}
            defaultValue={
               formatUnixToDate(
                  activeBroadCast
                     ? activeBroadCast.time : '',
                  true
               )
            }
            onChange={value =>
               updateBroadCast({
                  time: formatDateToUnix(value[0])
               })
            }
         />
      </div>
   );

   const updateBroadCast = (broadCastUpdatedData) => {
      const broadCastDataCopy = props.broadCastData.concat();
      const activeBroadCastCopy = broadCastDataCopy.find(item => item.id === broadCastId);

      Object.assign(activeBroadCastCopy, broadCastUpdatedData, {
         managerId: props.match.params.botId,
      });

      props.updateBroadcast(activeBroadCastCopy);
   };

   const sendBroadCastTab = () => (
      <div className={style.contentContainer}>
         <div className={style.userListBroadcast}>
            <div className={style.userListElement}>
               <h2>Список получателей:</h2>

               <Radio
                  id="allUsers"
                  name="allUsers"
                  checked
               >
                  Все пользователи ({activeBroadCast && activeBroadCast.users_count} пользователей)
               </Radio>
               <Checkbox
                  id="allUsers"
                  name="group"
                  onChange={e => updateBroadCast({for_group: e.target.checked})}
               >
                  Все группы
               </Checkbox>
            </div>
         </div>
         <div className={style.buttonsContainer}>
            <Button
               className={style.submitButton}
               variant="contained"
               onClick={() => updateBroadCast({
                  time: oldDate / 1000,
                  sent: 'False'
               })}
            >
               Начать рассылку
            </Button>

            <p>или</p>

            <Popover
               content={DatePickerMenu}
               title={null}
               trigger="click"
               visible={visible}
               onVisibleChange={handleVisibleChange}
            >
               <Button className={style.putOffButton} variant="outlined">
                  Отложить рассылку
               </Button>
            </Popover>
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
            ${activeBroadCast && activeBroadCast.sent && style.navigationSent}
         `}>
            <li
               className={!isOpenTestTab && style.activeNavigationElement}
               onClick={() => openTestTab(false)}
            >
               Отправка рассылки
            </li>
            {activeBroadCast && !activeBroadCast.sent && (
               <li
                  className={isOpenTestTab && style.activeNavigationElement}
                  onClick={() => openTestTab(true)}
               >
                  Тест рассылки
               </li>
            )}
         </ul>
         <Spin spinning={isFetching}>
            {activeBroadCast && activeBroadCast.sent ?
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
