import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

import {destinationScenario} from "../../constants/defaultValues";
import {matchWithoutSpaces} from "../../utils/textValidation";
import {ScenarioIdContext} from "../../utils/Contexts";

import {
   addNewAutoride,
   changeScenarioId,
   copyAutoride,
   deleteAutoride,
   editScenario,
   getAllScenariesForBot,
   getAutorideLinks
} from "../../actions/actionCreator";

import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import Pagination from "../Containers/Pagination";
import SearchData from "../searchData/searchData";
import {deletionConfirmation} from "../../utils/deletionConfirmation";

import vk from '../../images/imageForTable/vk-icon.png';
import telegram from '../../images/imageForTable/tlg-icon.png';
import facebook from '../../images/imageForTable/fb-icon.png';
import viber from '../../images/imageForTable/wh-icon.png';
import edit from '../../images/buttons/edit.png';
import trash from '../../images/buttons/trash.png';
import copy from '../../images/duplicate.jpg';
import leftArrow from '../../svg/db/left-arrow.svg';

import {Input, Dropdown, Menu} from 'antd';
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const AutorideContainer = props => {
   const {changeScenarioId, changedScenarioId, isFetching, isFetchingScenario, copyAutoRide} = props;

   const [autoridesDataInFilter, setautoridesDataInFilter] = useState([]);
   const [textAreaErrMsg, setTextAreaErrMsg] = useState("");
   const [textArea, setTextArea] = useState('');
   const [isOpenCreateScenarioFiled, setStatusCreateScenarioFiled] = useState(false);
	const [snackOpen, setSnackOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(9);

	const indexOfLastPost = currentPage * dataPerPage;
	const indexOfFirstPost = indexOfLastPost - dataPerPage;

	const currentData = data => data.slice(indexOfFirstPost, indexOfLastPost);
	const paginate = pageNumber => setCurrentPage(pageNumber);

   const scenariosForAutoride = [];

   props.botScenarios.filter(elem => elem.destination === destinationScenario.autoride).forEach(elem => {
      scenariosForAutoride.push(elem.id);
   });

   useEffect(() => {
      let changedAutorideData = null;

      if (changedScenarioId && props.autoridesData) {
         console.log(props.autoridesData.filter(elem => elem.scenario.id === changedScenarioId));
         changedAutorideData = props.autoridesData.filter(elem => elem.scenario.id === changedScenarioId)[0];
      }

      if (changedAutorideData) {
         props.getAutoridesLinks({
            idAutoride: changedAutorideData.id,
            managerId: props.match.params.botId
         });
      }

   }, [props.changedScenarioId]);

   useEffect(() => {
      if (props.autoridesData) {
         setautoridesDataInFilter(props.autoridesData)
      }
   }, [props.autoridesData]);

   const newAutorideHandler = () => {
      if (textArea.length !== 0) {
         props.appendAutoride(props.match.params.botId, textArea);
         setStatusCreateScenarioFiled(false);
         setTextArea('');
      } else {
         setSnackOpen(true);
         setTextAreaErrMsg('Заполните хотя бы одно ключевое слово');
      }
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
               href=""
            >
               <CloseIcon/>
            </IconButton>,
         ]}
      />
   );

   const editScenario = (e, scenarioId) => {
      props.editScenario({
         trigger_text: e.target.value,
         botId: props.match.params.botId,
         scenarioId: scenarioId
      })
   };

   if (isOpenCreateScenarioFiled) {
      return (
         <div className="new-scenario-container pv1-flex">
            <TextAreaSnackBar/>
            <div className="new-scenario-container-buttons">
               <Button
                  className="new-scenario-container-buttons__item main-theme-button-back"
                  onClick={() => setStatusCreateScenarioFiled(false)}
                  href=""
               >
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </Button>
               <Button
                  variant="contained"
                  className="new-scenario-container-buttons__item main-theme-button"
                  onClick={newAutorideHandler}
                  href=""
               >
                  Далее
               </Button>
            </div>
            <div className="new-scenario-form">
               <h2 className="new-scenario-form__title">Воронка</h2>
               <div className="new-scenario-form__textarea">
                  <p>Введите одно ключевое</p>

                  <textarea
                     value={textArea}
                     placeholder={'Введите ключевое слово'}
                     onInput={matchWithoutSpaces}
                     onChange={e => {
                        setSnackOpen(false);
                        setTextArea(e.target.value);
                     }}
                  />
               </div>
            </div>
         </div>
      )
   }

   if (changedScenarioId && props.botScenarios.length > 0 && scenariosForAutoride.indexOf(changedScenarioId) !== -1) {
      return (
         <div>
            <ScenarioIdContext.Provider value={changedScenarioId}>
               <ScenarioIdContext.Consumer>
                  {scenarioId => (
                     <TriggersContainer
                        changedScenarioId={changedScenarioId}
                        scenarioId={scenarioId}
                        changeScenarioId={changeScenarioId}
                        autoridesLinks={props.autoridesLinks}
                        isAutoRide
                        destination={destinationScenario.autoride}
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
               disabled={isFetching || isFetchingScenario}
               className="main-container-controls__button main-theme-button"
               onClick={() => setStatusCreateScenarioFiled(true)}
               href=""
            >
               {isFetching || isFetchingScenario
                  ? <CircularProgress size={23} color="white"/>
                  : 'Создать автоворонку'
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
                  <h2 className="main-table__title">Автоворонка</h2>
                  <div className="main-table__icon">
                     <span className="main-table__tooltip tableTooltip">Автоворонка</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <div className="main-table-search__container pv1-flex">
                  <SearchData
                     placeholder="Найти автоворонку"
                     handler={setautoridesDataInFilter}
                     data={props.autoridesData}
                  />
               </div>
            </div>

            <table className="main-table-content">
               <thead className="main-table-content__head">
                  <tr>
                     <td>Название</td>
                     <td>Каналы</td>
                     <td/>
                  </tr>
               </thead>

               <tbody className="main-table-content__body">
                  {autoridesDataInFilter.length > 0 ? (
                     currentData(autoridesDataInFilter).map((elem, idx) => {
								const menu = (
									<Menu className="main-table-content-body__edit">
										<div style={{padding: '15px'}}>
											<h2 style={{marginBottom: '10px', fontSize: '15px'}}>Введите ключевое слово</h2>
											<Input
												defaultValue={elem.scenario.trigger_text}
												onBlur={e => editScenario(e, elem.scenario.id)}
												onInput={matchWithoutSpaces}
											/>
										</div>
									</Menu>
								);

								return (
									<tr key={idx}>
										<td
											className="main-table-content-body__key-words"
											onClick={() => changeScenarioId(elem.scenario.id)}
										>
											Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
										</td>
										<td>
											<img className="social-icons" src={vk} alt={'vk'}/>
											<img className="social-icons" src={telegram} alt={'tg'}/>
											<img className="social-icons" src={facebook} alt={'fb'}/>
											<img className="social-icons" src={viber} alt={'viber'}/>
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
                                    onClick={() => copyAutoRide({
                                       managerId: props.match.params.botId,
                                       id: elem.id
                                    })}
                                 >
												<span className="main-table-content-body__tooltip tableTooltip">Копировать</span>
												<img className="main-table-content-body__img" src={copy} alt={'copy'}/>
											</div>
											<div
												className="main-table-content-body__icon"
												onClick={() => {
                                       deletionConfirmation(
                                          props.deleteAutoride,
                                          {
                                             managerId: props.match.params.botId,
                                             idAutoride: elem.id
                                          },
                                          `Удаление автоворонки: ${elem.scenario.trigger_text}`
                                       );
												}}
											>
												<span className="main-table-content-body__tooltip tableTooltip">Удалить</span>
												<img className="main-table-content-body__img" src={trash} alt={'trash'}/>
											</div>
										</td>
									</tr>
								);
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

				{autoridesDataInFilter.length > 9 && (
					<Pagination
						dataPerPage={dataPerPage}
						totalData={autoridesDataInFilter.length}
						currentPage={currentPage}
						paginate={paginate}
					/>
					)}
         </div>
      </div>
   )
};

const mapStateToProps = ({autoridesReducers, singleBotReducers}) => ({
   autoridesData: autoridesReducers.autoridesData,
	isFetching: autoridesReducers.isFetching,
	isFetchingScenario: singleBotReducers.isFetching,
   error: autoridesReducers.error,
   changedScenarioId: singleBotReducers.changedScenarioId,
   autoridesLinks: autoridesReducers.autoridesLinks,
   botScenarios: singleBotReducers.botScenarios
});

const mapDispatchToProps = dispatch => ({
   appendAutoride: (managerId, name) => dispatch(addNewAutoride(managerId, name)),
   deleteAutoride: data => dispatch(deleteAutoride(data)),
   editScenario: (scenarioData) => dispatch(editScenario(scenarioData)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId)),
   getAutoridesLinks: (autorideData) => dispatch(getAutorideLinks(autorideData)),
   getAllScenariesForBot: (idBot) => dispatch(getAllScenariesForBot(idBot)),
   copyAutoRide: data => dispatch(copyAutoride(data))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(AutorideContainer);
