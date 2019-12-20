import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {ScenarioIdContext} from "../../utils/Contexts";
import {sliceExtraText} from "../../utils/textValidation";

import {appendBroadCast, changeScenarioId, deleteBroadcast} from "../../actions/actionCreator";

const BroadCastContainer = props => {
   const {changeScenarioId, changedScenarioId, isFetching} = props;

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

   if (changedScenarioId && (changedBroadCastId || changedBroadCastId === 0)) {
      return (
         <div>
            <ScenarioIdContext.Provider value={changedScenarioId}>
               <ScenarioIdContext.Consumer>
                  {scenarioId => (
                     <TriggersContainer
                        getBroadcast
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
            <tbody className="main-table-content__body broadcast-table-sent-body">
            {props.broadCastData.filter(elem => elem.sent).length > 0 ? (
               props.broadCastData.map((elem, index) => {
                  let text;

                  if (elem.scenario) {
                     const triggers = elem.scenario.triggers;

                     const textFacebook = triggers[triggers.length - 1].messages.facebook.find(item => item.text && item.text.length !== 0);
                     const textTelegram = triggers[triggers.length - 1].messages.telegram.find(item => item.text && item.text.length !== 0);
                     const textVk = triggers[triggers.length - 1].messages.vk.find(item => item.text && item.text.length !== 0);
                     const textWhatsapp = triggers[triggers.length - 1].messages.whatsapp.find(item => item.text && item.text.length !== 0);

                     if (textFacebook) {
                        text = textFacebook.text
                     } else if (textTelegram) {
                        text = textTelegram.text
                     } else if (textVk) {
                        text = textVk.text
                     } else if (textWhatsapp) {
                        text = textWhatsapp.text
                     }
                  }

                  return elem.sent && (
                     <tr
                        key={index}
                        onClick={() => {
                           changeScenarioId(elem.scenario.id);
                        }}
                     >
                        <td className="main-table-content-body__key-words">
                           <span>{sliceExtraText(text, 41) || elem.scenario.triggers[elem.scenario.triggers.length - 1].caption}</span>
                        </td>
                        <td>
                           {elem.users_count}
                        </td>
                        <td>
                           {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                        </td>
                        <td>
                           <FontAwesomeIcon icon={faTrash}/>
                        </td>
                     </tr>
                  )
               })
            ) : (
               <tr>
                  <td className="main-table-content-body__key-words">
                     Тут пока пусто
                  </td>
                  <td/>
                  <td/>
                  <td/>
               </tr>
            )}
            </tbody>
         )
      } else {
         return (
            <tbody className="main-table-content__body broadcast-table-not-sent-body">
            {props.broadCastData.filter(elem => !elem.sent).length > 0 ? (
               props.broadCastData.map((elem, index) => {
                  let text;

                  if (elem.scenario) {
                     const triggers = elem.scenario.triggers;

                     const textFacebook = triggers[triggers.length - 1].messages.facebook.find(item => item.text && item.text.length !== 0);
                     const textTelegram = triggers[triggers.length - 1].messages.telegram.find(item => item.text && item.text.length !== 0);
                     const textVk = triggers[triggers.length - 1].messages.vk.find(item => item.text && item.text.length !== 0);
                     const textWhatsapp = triggers[triggers.length - 1].messages.whatsapp.find(item => item.text && item.text.length !== 0);

                     if (textFacebook) {
                        text = textFacebook.text
                     } else if (textTelegram) {
                        text = textTelegram.text
                     } else if (textVk) {
                        text = textVk.text
                     } else if (textWhatsapp) {
                        text = textWhatsapp.text
                     }
                  }

                  return !elem.sent && (
                     <tr key={index} onClick={() => {
                        changeScenarioId(elem.scenario.id);
                     }}>
                        <td className="main-table-content-body__key-words">
                           <span>{sliceExtraText(text, 41) || elem.scenario.triggers[elem.scenario.triggers.length - 1].caption}</span>
                        </td>
                        <td>
                           {elem.users_count}
                        </td>
                        <td>
                           {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                        </td>
                        <td>
                           <FontAwesomeIcon icon={faTrash}/>
                        </td>
                     </tr>
                  )
               })
            ) : (
               <tr>
                  <td className="main-table-content-body__key-words">
                     Тут пока пусто
                  </td>
                  <td/>
                  <td/>
                  <td/>
               </tr>
            )}
            </tbody>
         );
      }
   };


   return (
      <div className="main-container pv1-flex pv1-j-sb">
         <div className="main-container-controls pv1-flex">
            <Button
               variant="contained"
               disabled={isFetching}
               className="main-container-controls__button main-theme-button"
               onClick={appendBroadcastHandler}
            >
               {isFetching
                  ? <CircularProgress size={23} color="white"/>
                  : 'Создать рассылку'
               }
            </Button>
            <div className="main-container-controls__divider"/>
            <div className="main-container__info pv1-flex">
               <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
               <div className="main-container-info__text">
                  <p className="main-container-info-text__desc">
                     Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.
                  </p>
                  <span className="main-container-info-text__link">
                     Перейти в руководство
                  </span>
               </div>
            </div>
         </div>
         <div className="main-table">
            <div className="main-table__search broadcast-table__search">
               <div className="pv1-flex">
                  <h2 className="main-table__title">Рассылка</h2>
                  <div className="main-table__icon">
                     <span className="main-table__tooltip tableTooltip">Рассылка</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <ul className="main-table-search__nav">
                  <li
                     onClick={() => changeTypeBroadcast('sended')}
                     className={
                        chanedTypeBroadcast === 'sended'
                           ? "main-table-search-nav__item-active"
                           : "main-table-search-nav__item"
                     }
                  >
                     Отправленные
                  </li>
                  <li
                     onClick={() => changeTypeBroadcast('ordered')}
                     className={
                        chanedTypeBroadcast === 'sended'
                           ? "main-table-search-nav__item"
                           : "main-table-search-nav__item-active"
                     }>
                     Отложенные
                  </li>
               </ul>
            </div>
            <table className="main-table-content">
               <thead className="main-table-content__head">
               <tr>
                  <td>Сообщение</td>
                  <td>Получателей</td>
                  <td>Дата</td>
                  <td/>
               </tr>
               </thead>
               {broadCastData()}
            </table>
         </div>
      </div>
   )
};

const mapStateToProps = ({broadCastReducers, singleBotReducers}) => ({
   broadCastData: broadCastReducers.broadCastData,
   isFetching: broadCastReducers.isFetching,
   error: broadCastReducers.error,
   changedScenarioId: singleBotReducers.changedScenarioId,
});

const mapDispatchToProps = dispatch => ({
   appendBroadcast: (managerId) => dispatch(appendBroadCast(managerId)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId)),
   deleteBroadCast: (managerId, broadCastId) => dispatch(deleteBroadcast(managerId, broadCastId)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BroadCastContainer);
