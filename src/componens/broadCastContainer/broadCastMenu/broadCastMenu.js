import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import CustomFlatPicker from "../../messages/timerElement/customFlatPicker/customFlatPicker";
import {formatDateToUnix, formatUnixToDate} from "../../../utils/formatDate";
import {updateBroadCasts} from "../../../actions/actionCreator";

import {Popover, Radio, Select} from 'antd';
import Button from '@material-ui/core/Button';

import style from './broadCastMenu.module.sass';
import {moduleName as tagsModule} from "../../../ducks/Tags";

const {Option} = Select;

const BroadCastMenu = props => {
   const {broadCastId, isFetching, broadCastData, tags} = props;

   const [value, setValue] = useState(1);
   const [visible, setVisible] = useState(false);

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

   const handleChange = value => {
      updateBroadCast({
         tag: value.toString()
      })
   };

   const deselectHandle = value => {
      const filteredTags = tags.filter(item => item.name !== value);
      const tagsArr = filteredTags.map(item => item.name);

      updateBroadCast({
         tag: tagsArr.toString()
      })
   };

   const onRadioChange = event => {
      setValue(event.target.value);
   };

   // const userCount = activeBroadCast ? activeBroadCast.users_count === 1 ? `${activeBroadCast.users_count} пользователь` :
   //    activeBroadCast.users_count >= 2 ? `${activeBroadCast.users_count} пользователя` :
   //       activeBroadCast.users_count >= 5 ? `${activeBroadCast.users_count} пользователей` : `${activeBroadCast.users_count} пользователей` : '0 пользователей';

   return (
      <div className={style.mainContainer}>
         {activeBroadCast && activeBroadCast.sent ? (
            <div className={style.completeMessage}>
               <p>Рассылка разослана!</p>

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
         ) : (
            <div>
               <p className={style.mainContainerTitle}>Отправка рассылки!</p>

               <div className={style.userListBroadcast}>
                  <div className={style.userListElement}>
                     <h2>Выберите список получателей:</h2>

                     <Radio.Group onChange={onRadioChange} value={value}>
                        <Radio value={1}>Все пользователи</Radio>
                        <Radio value={2}>Рассылка по тегам:</Radio>
                     </Radio.Group>

                     <div className={style.userListElementTags}>
                        {value === 2 && (
                           <Select
                              mode="multiple"
                              style={{width: '100%'}}
                              disabled={isFetching}
                              loading={isFetching}
                              onDeselect={deselectHandle}
                              onBlur={handleChange}
                              placeholder="Выберите теги"
                              defaultValue={activeBroadCast && activeBroadCast.tag.length !== 0 ? activeBroadCast.tag.split(',') : []}
                           >
                              {tags.map(item => (
                                 <Option value={item.name}>{item.name}</Option>
                              ))}
                           </Select>
                        )}
                     </div>

                     {/*<Checkbox*/}
                     {/*   id="allUsers"*/}
                     {/*   name="group"*/}
                     {/*   onChange={e => updateBroadCast({for_group: e.target.checked})}*/}
                     {/*>*/}
                     {/*   Все группы*/}
                     {/*</Checkbox>*/}
                  </div>
               </div>
               <div className={style.buttonsContainer}>
                  <Button
                     className={style.submitButton}
                     loading={isFetching}
                     disabled={isFetching}
                     variant="contained"
                     onClick={() => updateBroadCast({
                        time: oldDate / 1000,
                        sent: 'False',
                        proccessing: 'False'
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
                     <Button className={style.putOffButton} variant="outlined" disabled={isFetching}>
                        Отложить рассылку
                     </Button>
                  </Popover>
               </div>
            </div>
         )}
      </div>
   )
};

const mapStateToProps = state => ({
   changedSocial: state.singleBotReducers.changedSocial,
   broadCastData: state.broadCastReducers.broadCastData,
   isFetching: state.broadCastReducers.isFetching,
   error: state.broadCastReducers.error,
   tags: state[tagsModule].tags,
});

const mapDispatchToProps = dispatch => ({
   updateBroadcast: broadcastData => dispatch(updateBroadCasts(broadcastData))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BroadCastMenu);
