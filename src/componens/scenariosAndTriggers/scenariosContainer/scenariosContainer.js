import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import {destinationScenario} from "../../../constants/defaultValues";
import {ScenarioIdContext} from "../../../utils/Contexts";
import {
   addNewScenario,
   deleteScenario,
   copyScenario,
   editScenario,
   changeScenarioId
} from "../../../actions/actionCreator";

import edit from "../../../images/buttons/edit.png";
import copy from "../../../images/duplicate.jpg";
import trash from "../../../images/buttons/trash.png";
import leftArrow from "../../../svg/db/left-arrow.svg";

import TriggersContainer from '../../scenariosAndTriggers/triggersContainer/triggersContainer';
import SearchData from "../../searchData/searchData";

import {Select, Dropdown, Input, Menu} from 'antd';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const ScenariosContainer = props => {
   const {changeScenarioId, changedScenarioId, isFetching} = props;

   const [textArea, setTextArea] = useState("");
   const [textAreaErrMsg, setTextAreaErrMsg] = useState("");
   const [snackOpen, setSnackOpen] = useState(false);

   const [scenariosDataInFilter, setScenariosDataInFilter] = useState([]);
   const [isOpenCreateScenarioField, setStatusCreateScenarioField] = useState(false);

   function handleChange(value) {
      setTextArea(value);
   }

   useEffect(() => {
      setScenariosDataInFilter(props.scenariosForScenarioContainer)
   }, [props.scenariosForScenarioContainer]);

   const newScenarioHandler = () => {
      if (textArea.length !== 0) {
         props.addScenario(props.match.params.botId, destinationScenario.default, textArea);
         setStatusCreateScenarioField(false);
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
         className=""
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
               href=""
            >
               <CloseIcon/>
            </IconButton>,
         ]}
      />
   );

   if (isOpenCreateScenarioField) {
      return (
         <div className="new-scenario-container pv1-flex">
            <TextAreaSnackBar/>
            <div className="new-scenario-container-buttons">
               <Button
                  className="new-scenario-container-buttons__item main-theme-button-back"
                  onClick={() => setStatusCreateScenarioField(false)}
                  href=""
               >
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </Button>
               <Button
                  variant="contained"
                  className="new-scenario-container-buttons__item main-theme-button"
                  onClick={newScenarioHandler}
                  href=""
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
                     style={{width: '100%'}}
                     placeholder="Введите ключевое слово"
                     onChange={handleChange}
                  />
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

   return (
      <div className="main-container pv1-flex pv1-j-sb">
         <div className="main-container-controls pv1-flex">
            <Button
               variant="contained"
               disabled={isFetching}
               className="main-container-controls__button main-theme-button"
               onClick={() => setStatusCreateScenarioField(true)}
               href=""
            >
               {isFetching
                  ? <CircularProgress size={23} color="white"/>
                  : 'Создать команду'
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
            <div className="main-table__search">
               <div className="pv1-flex">
                  <h2 className="main-table__title">Команды бота</h2>
                  <div className="main-table__icon">
                     <span className="main-table__tooltip tableTooltip">Команды бота</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <div className="main-table-search__container pv1-flex">
                  <SearchData
                     placeholder="Найти команду"
                     handler={setScenariosDataInFilter}
                     data={props.scenariosForScenarioContainer}
                  />
               </div>
            </div>
            <div style={{width: '100%'}}>
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
                     scenariosDataInFilter.map((elem, index) => {
								const menu = (
									<Menu className="main-table-content-body__edit">
										<div style={{padding: '15px'}}>
											<h2 style={{marginBottom: '10px', fontSize: '15px'}}>Введите ключевое слово</h2>
											<Input
												defaultValue={elem.trigger_text}
												onBlur={e => editScenario(e, elem.id)}
											/>
										</div>
									</Menu>
								)

								return (
									<tr key={index}>
                           <td
                              className="main-table-content-body__key-words"
                              onClick={() => changeScenarioId(elem.id)}
                           >
                              Сообщение в точности совпадает с <span>{elem.trigger_text.split(',').join(', ')}</span>
                           </td>
                           <td>
                              {elem.triggers.length} ответ
                           </td>
                           <td className="main-table-content-body__controls">
										<Dropdown 
											overlay={menu}
											trigger={['click']}
											placement="bottomCenter"
											className="main-table-content-body__icon"
										>
                                 <div>
												<span className="main-table-content-body__tooltip tableTooltip">Редактировать</span>
												<img
													className="main-table-content-body__img"
													src={edit}
													alt={'edit'}
												/>
											</div>
                              </Dropdown>

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
								)
							})
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
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   botScenarios: singleBotReducers.botScenarios,
   scenariosForScenarioContainer: singleBotReducers.scenariosForScenarioContainer,
   isFetching: singleBotReducers.isFetching,
   error: singleBotReducers.error,
   changedScenarioId: singleBotReducers.changedScenarioId,
});

const mapDispatchToProps = dispatch => ({
   addScenario: (botId, destination, trigger_text) => dispatch(addNewScenario(botId, destination, trigger_text)),
   changeScenarioId: scenarioId => dispatch(changeScenarioId(scenarioId)),
   deleteScenario: scenarioData => dispatch(deleteScenario(scenarioData)),
   copyScenario: scenarioData => dispatch(copyScenario(scenarioData)),
   editScenario: scenarioData => dispatch(editScenario(scenarioData)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ScenariosContainer);
