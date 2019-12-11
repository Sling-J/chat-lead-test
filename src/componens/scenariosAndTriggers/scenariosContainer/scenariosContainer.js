import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import TriggersContainer from '../../scenariosAndTriggers/triggersContainer/triggersContainer';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {
   addNewScenario,
   deleteScenario,
   copyScenario,
   editScenario,
   changeScenarioId
} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import {ScenarioIdContext} from "../../../utils/Contexts";
import {destinationScenario} from "../../../constants/defaultValues";
import edit from "../../../images/buttons/edit.png";
import copy from "../../../images/duplicate.jpg";
import trash from "../../../images/buttons/trash.png";
import leftArrow from "../../../svg/db/left-arrow.svg";
import ContextMenuForEditScenario from './contextMenuForEditScenario/contextMenuForEditScenario';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import {Select} from 'antd';

const ScenariosContainer = (props) => {
   const {changeScenarioId, changedScenarioId} = props;

   const [textArea, setTextArea] = useState("");
   const [textAreaErrMsg, setTextAreaErrMsg] = useState("");
   const [snackOpen, setSnackOpen] = useState(false);

   const [scenariosDataInFilter, setScenariosDataInFilter] = useState([]);
   const [isOpenCreateScenarioFild, setStatusCreateScenarioFild] = useState(false);
   const [idEditTriggerText, setIdEditTriggerText] = useState(false);

   function handleChange(value) {
      setTextArea(value)
   }

   useEffect(() => {
      setScenariosDataInFilter(props.scenariosForScenarioContainer)
   }, [props.scenariosForScenarioContainer]);

   const newScenarioHandler = () => {
      if (textArea.length !== 0) {
         props.addScenario(props.match.params.botId, destinationScenario.default, textArea);
         setStatusCreateScenarioFild(false);
         setTextArea('');
      } else {
         setSnackOpen(true);
         setTextAreaErrMsg('Заполните хотя бы одно ключевое слово');
      }
   };

   const copyScenario = (id) => {
      const copyedScenario = props.botScenarios.filter(elem => elem.id === id)[0];
      Object.assign(copyedScenario, {
         managerId: props.match.params.botId
      });

      props.copyScenario(copyedScenario);
   };

   const editScenario = (e, scenarioId) => {
      props.editScenario({
         trigger_text: e.target.value,
         botId: props.match.params.botId,
         scenarioId: scenarioId
      })
   };

   const snackClose = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setSnackOpen(false);
      setTextAreaErrMsg('');
   };

   const TextAreaSnackBar = () => (
      <Snackbar
         className="snackBar"
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
         }}
         open={snackOpen}
         autoHideDuration={6000}
         onClose={snackClose}
         ContentProps={{
            'aria-describedby': 'message-id',
         }}
         message={
            <span id="message-id">
               {textAreaErrMsg}
            </span>
         }
         action={[
            <IconButton
               key="close"
               aria-label="close"
               color="inherit"
               onClick={snackClose}
            >
               <CloseIcon/>
            </IconButton>,
         ]}
      />
   );


   if (isOpenCreateScenarioFild) {
      return (
         <div className="new-scenario-container pv1-flex">
            <TextAreaSnackBar/>
            <div className="new-scenario-container-buttons">
               <Button
                  className="new-scenario-container-buttons__item main-theme-button-back"
                  onClick={() => setStatusCreateScenarioFild(false)}
               >
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </Button>
               <Button
                  variant="contained"
                  className="new-scenario-container-buttons__item main-theme-button"
                  onClick={newScenarioHandler}
               >
                  Далее
               </Button>
            </div>
            <div className="new-scenario-form">
               <h2 className="new-scenario-form__title">Команда</h2>

               <div className="new-scenario-form__textarea">
                  <p>Введите ключевые слова через клавишу "enter"</p>

                  <Select
                     mode="tags"
                     className="new-scenario-form__tags"
                     style={{ width: '100%' }}
                     placeholder="Введите ключевое слово"
                     onChange={handleChange}
                  />
                  {/*<textarea*/}
                  {/*   value={textArea}*/}
                  {/*   onChange={e => {*/}
                  {/*      setSnackOpen(false);*/}
                  {/*      setTextArea(e.target.value);*/}
                  {/*   }}*/}
                  {/*   placeholder={'Введите ключевое слово'}*/}
                  {/*/>*/}
               </div>
            </div>
         </div>
      )
   }

   if (changedScenarioId) {
      return (
         <div>
            <ScenarioIdContext.Provider value={changedScenarioId}>
               <ScenarioIdContext.Consumer>
                  {scenarioId => (
                     <TriggersContainer
                        changedScenarioId={changedScenarioId}
                        scenarioId={scenarioId}
                        changeScenarioId={changeScenarioId}
                     />
                  )}
               </ScenarioIdContext.Consumer>
            </ScenarioIdContext.Provider>
         </div>
      )
   }

   const dynamicSearchData = (searchString) => {
      const scenariosData = [];

      props.scenariosForScenarioContainer.forEach(elem => {
         if (searchString) {
            if (elem.trigger_text.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
               scenariosData.push(elem);
            }
         } else if (!searchString) {
            scenariosData.push(elem);
         }
      });

      setScenariosDataInFilter(scenariosData);
   };


   return (
      <div className="main-container pv1-flex pv1-j-sb">
         <div className="main-container-controls pv1-flex">
            <Button
               variant="contained"
               className="main-container-controls__button main-theme-button"
               onClick={() => setStatusCreateScenarioFild(true)}
            >
               Создать команду
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
            <div className="main-table__search">
               <div className="pv1-flex">
                  <h2 className="main-table__title">Команды бота</h2>
                  <div className="main-table__icon">
                     <span className="main-table__tooltip tableTooltip">Команды бота</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <div className="main-table-search__container pv1-flex">
                  <input
                     type={'text'}
                     className="main-table-search-container__input"
                     placeholder={'Найти команду'}
                     onInput={(e) => {
                        dynamicSearchData(e.target.value)
                     }}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"
                       enableBackground="new 0 0 512 512" width="512px" height="512px" className="">
                     <g>
                        <g>
                           <path
                              d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
                              data-original="#000000" className="active-path" data-old_color="#000000" fill="#DADADA"/>
                        </g>
                     </g>
                  </svg>
               </div>
            </div>
            <table className="main-table-content">
               <thead className="main-table-content__head">
               <tr>
                  <td>Правило</td>
                  <td>Содержимое</td>
                  <td/>
               </tr>
               </thead>

               <tbody className="main-table-content__body">
               {scenariosDataInFilter.length > 0 ? (
                  scenariosDataInFilter.map((elem, index) => (
                     <tr key={index}>
                        <td
                           className="main-table-content-body__key-words"
                           onClick={
                              idEditTriggerText === elem.id ?
                                 null : () => changeScenarioId(elem.id)
                           }
                        >
                           Сообщение в точности совпадает с <span>{elem.trigger_text}</span>

                           <div className="main-table-content-body__editor">
                              {idEditTriggerText === elem.id && (
                                 <ContextMenuForEditScenario
                                    onInput={(e) => editScenario(e, elem.id)}
                                    defaultValue={elem.trigger_text}
                                    setIdEditTriggerText={(id) => setIdEditTriggerText(id)}
                                 />
                              )}
                           </div>
                        </td>
                        <td>
                           {elem.triggers.length} ответ
                        </td>
                        <td className="main-table-content-body__controls">
                           <div
                              className="main-table-content-body__icon"
                              onClick={() => setIdEditTriggerText(elem.id)}
                           >
                              <span className="main-table-content-body__tooltip tableTooltip">Редактировать</span>
                              <img
                                 className="main-table-content-body__img"
                                 src={edit}
                                 alt={'edit'}
                              />
                           </div>

                           <div
                              className="main-table-content-body__icon"
                              onClick={() => copyScenario(elem.id)}
                           >
                              <span className="main-table-content-body__tooltip tableTooltip">Копировать</span>
                              <img
                                 className="main-table-content-body__img"
                                 src={copy}
                                 alt={'copy'}
                              />
                           </div>
                           <div
                              className="main-table-content-body__icon"
                              onClick={() => props.deleteScenario({
                                 botId: props.match.params.botId,
                                 idScenario: elem.id
                              })}
                           >
                              <span className="main-table-content-body__tooltip tableTooltip">Удалить</span>
                              <img
                                 className="main-table-content-body__img"
                                 src={trash}
                                 alt={'trash'}
                              />
                           </div>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td className="main-table-content-body__key-words">
                        Ничего не найдено
                     </td>
                     <td/>
                     <td className="main-table-content-body__controls"/>
                  </tr>
               )}
               </tbody>
            </table>
         </div>
      </div>
   )
};

const mapStateToProps = state => {
   const {botScenarios, scenariosForScenarioContainer, isFetching, error, changedScenarioId} = state.singleBotReducers;

   return {
      botScenarios, scenariosForScenarioContainer, isFetching, error, changedScenarioId
   }
};

const mapDispatchToProps = dispatch => ({
   addScenario: (botId, destination, trigger_text) => dispatch(addNewScenario(botId, destination, trigger_text)),
   deleteScenario: (scenarioData) => dispatch(deleteScenario(scenarioData)),
   copyScenario: (scenarioData) => dispatch(copyScenario(scenarioData)),
   editScenario: (scenarioData) => dispatch(editScenario(scenarioData)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ScenariosContainer);
