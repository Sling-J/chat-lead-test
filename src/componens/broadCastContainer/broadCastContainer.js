import React, {Fragment, useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import moment from 'moment';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import Pagination from "../Containers/Pagination";
import {ScenarioIdContext} from "../../utils/Contexts";
import {sliceExtraText} from "../../utils/textValidation";

import {appendBroadCast, changeScenarioId, deleteBroadcast} from "../../actions/actionCreator";

import {deletionConfirmation} from "../../utils/deletionConfirmation";

const BroadCastContainer = props => {
   const {changeScenarioId, changedScenarioId, isFetching, deleteBroadcast} = props;

   const [changedBroadCastId, changeBroadCastId] = useState(null);
   const [changedTypeBroadcast, changeTypeBroadcast] = useState('sended');

   const [currentPage, setCurrentPage] = useState(1);
   const [dataPerPage] = useState(9);

   const indexOfLastPost = currentPage * dataPerPage;
   const indexOfFirstPost = indexOfLastPost - dataPerPage;

   const currentDataSent = data => data.filter(item => item.sent).slice(indexOfFirstPost, indexOfLastPost);
   const currentDataNotSent = data => data.filter(item => !item.sent).slice(indexOfFirstPost, indexOfLastPost);
   const paginate = pageNumber => setCurrentPage(pageNumber);

   const appendBroadcastHandler = () => {
      props.appendBroadcast(props.match.params.botId)
   };

   useEffect(() => {
      changeScenarioId(null);
   }, []);

   useEffect(() => {
      if (changedScenarioId) {
         const broadcast = props.broadCastData.find(elem => elem.scenario.id === changedScenarioId);
         changeBroadCastId(broadcast ? broadcast.id : null);
      } else {
         changeBroadCastId(null);
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

   const showBroadCastTitle = trigger => {
      let text;

      const socialText = social => Array.isArray(social)
         ? social.find(item => item.text && item.text.length !== 0)
         : social;

      if (socialText(trigger.messages.facebook)) {
         text = socialText(trigger.messages.facebook).text;
      } else if (socialText(trigger.messages.telegram)) {
         text = socialText(trigger.messages.telegram).text;
      } else if (socialText(trigger.messages.vk)) {
         text = socialText(trigger.messages.vk).text;
      } else if (socialText(trigger.messages.whatsapp)) {
         text = socialText(trigger.messages.whatsapp).text;
      }

      return text;
   };

   const broadCastData = () => {
      if (changedTypeBroadcast === 'sended') {
         return (
            <Fragment>
               <table className="main-table-content">
                  <thead className="main-table-content__head">
                  <tr>
                     <td>Сообщение</td>
                     <td>Получателей</td>
                     <td>Дата</td>
                     <td/>
                  </tr>
                  </thead>
                  <tbody className="main-table-content__body broadcast-table-sent-body">
                  {props.broadCastData.filter(elem => elem.sent).length > 0 ? (
                     currentDataSent(props.broadCastData).map((elem, index) => {
                        const text = showBroadCastTitle(elem.scenario.triggers[0]);

                        return elem.sent && (
                           <tr onClick={() => changeScenarioId(elem.scenario.id)} key={index}>
                              <td className="main-table-content-body__key-words">
                                 <span>{text ? sliceExtraText(text, 41) : elem.scenario.triggers[0].caption}</span>
                              </td>
                              <td>
                                 {elem.users_count}
                              </td>
                              <td>
                                 {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                              </td>
                              <td onClick={e => {
                                 e.stopPropagation();
                                 deletionConfirmation(
                                    deleteBroadcast,
                                    {
                                       managerId: props.match.params.botId,
                                       broadCastId: elem.id
                                    },
                                    `Удаление рассылки: ${text ? sliceExtraText(text, 41) : elem.scenario.triggers[0].caption}`
                                 );
                              }}>
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
               </table>

               {props.broadCastData.filter(elem => elem.sent).length > 9 && (
                  <Pagination
                     dataPerPage={dataPerPage}
                     totalData={props.broadCastData.filter(elem => elem.sent).length}
                     currentPage={currentPage}
                     paginate={paginate}
                  />
               )}
            </Fragment>
         )
      } else {
         return (
            <Fragment>
               <table className="main-table-content">
                  <thead className="main-table-content__head">
                  <tr>
                     <td>Сообщение</td>
                     <td>Получателей</td>
                     <td>Дата</td>
                     <td/>
                  </tr>
                  </thead>

                  <tbody className="main-table-content__body broadcast-table-not-sent-body">
                  {props.broadCastData.filter(elem => !elem.sent).length > 0 ? (
                     currentDataNotSent(props.broadCastData).map((elem, index) => {
                        const text = showBroadCastTitle(elem.scenario.triggers[0]);

                        return !elem.sent && (
                           <tr onClick={() => changeScenarioId(elem.scenario.id)} key={index}>
                              <td className="main-table-content-body__key-words">
												<span>
													{text ? sliceExtraText(text, 41) : elem.scenario.triggers[0].caption}
												</span>
                              </td>
                              <td>
                                 {elem.users_count}
                              </td>
                              <td>
                                 {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                              </td>
                              <td onClick={e => {
                                 e.stopPropagation();
                                 deletionConfirmation(
                                    deleteBroadcast,
                                    {
                                       managerId: props.match.params.botId,
                                       broadCastId: elem.id
                                    },
                                    `Удаление рассылки: ${text ? sliceExtraText(text, 41) : elem.scenario.triggers[0].caption}`
                                 );
                              }}>
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
               </table>

               {props.broadCastData.filter(elem => !elem.sent).length > 9 && (
                  <Pagination
                     dataPerPage={dataPerPage}
                     totalData={props.broadCastData.filter(elem => !elem.sent).length}
                     currentPage={currentPage}
                     paginate={paginate}
                  />
               )}
            </Fragment>
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
                        changedTypeBroadcast === 'sended'
                           ? "main-table-search-nav__item-active"
                           : "main-table-search-nav__item"
                     }
                  >
                     Отправленные
                  </li>
                  <li
                     onClick={() => changeTypeBroadcast('ordered')}
                     className={
                        changedTypeBroadcast === 'sended'
                           ? "main-table-search-nav__item"
                           : "main-table-search-nav__item-active"
                     }>
                     Отложенные
                  </li>
               </ul>
            </div>

            {broadCastData()}
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
   appendBroadcast: managerId => dispatch(appendBroadCast(managerId)),
   changeScenarioId: scenarioId => dispatch(changeScenarioId(scenarioId)),
   deleteBroadcast: data => dispatch(deleteBroadcast(data)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BroadCastContainer);
