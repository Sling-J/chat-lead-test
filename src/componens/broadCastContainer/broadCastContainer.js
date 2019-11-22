import React, {useState, useEffect} from 'react';
import style from './broadCastContainer.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {appendBroadCast, changeScenarioId} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import moment from 'moment';


const BroadCastContainer = (props) => {
   const {changeScenarioId, changedScenarioId} = props;

   // const [changedScenarioId, changeScenarioId] = useState(false);
   const [changedBroadCastId, changeBroadCastId] = useState(false);
   const [chanedTypeBroadcast, changeTypeBroadcast] = useState('sended');


   const appendBroadcastHandler = () => {
      props.appendBroadcast(props.match.params.botId)
   };

   useEffect(() => {
      if (changedScenarioId) {
         props.broadCastData.forEach((elem, index) => {
            if (elem.scenario.id === changedScenarioId) {
               changeBroadCastId(index);
            }
         })
      } else {
         changeBroadCastId(false);
      }
   }, [changedScenarioId]);

   console.log(props.broadCastData);
   if (changedScenarioId && (changedBroadCastId || changedBroadCastId === 0)) {
      return (
         <div className={style.triggersContainer}>
            <ScenarioIdContext.Provider value={changedScenarioId}>
               <ScenarioIdContext.Consumer>
                  {scenarioId => (
                     <TriggersContainer
                        changedScenarioId={changedScenarioId}
                        scenarioId={scenarioId}
                        broadCastId={changedBroadCastId}
                        changeScenarioId={changeScenarioId}
                     />
                  )}
               </ScenarioIdContext.Consumer>
            </ScenarioIdContext.Provider>
         </div>
      )
   }

   const broadCastData = () => {
      if (chanedTypeBroadcast === 'sended') {
         return (
            props.broadCastData.filter(elem => elem.sent).length > 0 ? (
               props.broadCastData.map((elem, index) => {
                  if (elem.sent) {
                     return (
                        <tr>
                           <td className={style.keyWord} onClick={() => {
                              changeScenarioId(elem.scenario.id);
                              // changeBroadCastId(index);
                           }}>
                              Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                           </td>
                           <td>
                              {elem.users_count}
                           </td>
                           <td className={style.controlsImages}>
                              {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                           </td>
                        </tr>
                     )
                  }
               })
            ) : (
               <tr>
                  <td className={style.keyWord}>
                     Тут пока пусто
                  </td>
                  <td/>
                  <td className={style.controlsImages}/>
               </tr>
            )
         );
      } else {
         return (
            props.broadCastData.filter(elem => !elem.sent).length > 0 ? (
               props.broadCastData.map((elem, index) => {
                  if (!elem.sent) {
                     return (
                        <tr>
                           <td className={style.keyWord} onClick={() => {
                              changeScenarioId(elem.scenario.id);
                              // changeBroadCastId(index);
                           }}>
                              Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                           </td>
                           <td>
                              {elem.users_count}
                           </td>
                           <td className={style.controlsImages}>
                              {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                           </td>
                        </tr>
                     )
                  }
               })
            ) : (
               <tr>
                  <td className={style.keyWord}>
                     Тут пока пусто
                  </td>
                  <td/>
                  <td className={style.controlsImages}/>
               </tr>
            )
         );
      }
   };


   return (
      <div className={style.mainContainer}>
         <div className={style.controls}>
            <div className={style.createButton} onClick={appendBroadcastHandler}>Создать рассылку</div>
            <div className={style.hardLine}/>
            <div className={style.infoBlock}>
               <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
               <div className={style.infoText}>
                  <p>Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.</p>
                  <span>Перейти в руководство</span>
               </div>
            </div>
         </div>
         <div className={style.scenariosContainer}>
            <div className={style.inputContainer}>
               <div className={style.flexLeft}>
                  <h2>Рассылка</h2>
                  <div className={style.icon}>
                     <span className={style.tooltipText}>Рассылка</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <ul className={style.navbar}>
                  <li
                     onClick={() => changeTypeBroadcast('sended')}
                     className={chanedTypeBroadcast === 'sended' ? style.navElementActive : style.navElement}
                  >
                     Отправленные
                  </li>
                  <li
                     onClick={() => changeTypeBroadcast('ordered')}
                     className={chanedTypeBroadcast === 'sended' ? style.navElement : style.navElementActive}>
                     Отложенные
                  </li>
               </ul>
            </div>
            <table>
               <tr>
                  <td>Сообщение</td>
                  <td>Получателей</td>
                  <td>Дата</td>
               </tr>
               {broadCastData()}
            </table>

         </div>
      </div>
   )
};

const mapStateToProps = state => {
   const {broadCastData, isFetching, error} = state.broadCastReducers;
   const {changedScenarioId} = state.singleBotReducers;


   return {
      broadCastData, isFetching, error, changedScenarioId
   }
};

const mapDispatchToProps = dispatch => ({
   appendBroadcast: (managerId) => dispatch(appendBroadCast(managerId)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadCastContainer));
