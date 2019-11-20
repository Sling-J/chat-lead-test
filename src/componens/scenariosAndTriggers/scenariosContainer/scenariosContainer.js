import React, {useState, useEffect} from 'react';
import style from './scenariosContainer.module.sass';
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


const ScenariosContainer = (props) => {
   const {changeScenarioId, changedScenarioId} = props;

   const [scenariosDataInFilter, setScenariosDataInFilter] = useState([]);
   const [isOpenCreateScenarioFild, setStatusCreateScenarioFild] = useState(false);
   const [idEditTriggerText, setIdEditTriggerText] = useState(false);

   useEffect(() => {
      setScenariosDataInFilter(props.scenariosForScenarioContainer)
   }, [props.scenariosForScenarioContainer]);

   const newScenarioHandler = () => {
      props.addScenario(props.match.params.botId, destinationScenario.default, isOpenCreateScenarioFild);
      setStatusCreateScenarioFild(false);
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


   if (isOpenCreateScenarioFild) {
      return (
         <div className={style.newScenarioContainer}>
            <div className={style.buttonsContainer}>
               <div
                  className={style.before}
                  onClick={() => setStatusCreateScenarioFild(false)}
               >
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </div>
               <div className={style.next} onClick={newScenarioHandler}>Далее</div>
            </div>
            <div className={style.contentContainer}>
               <h2>Команда</h2>
               <div className={style.createScenarioContainer}>
                       <textarea
                          placeholder={'Введите ключевое слово'}
                          onInput={(e) => setStatusCreateScenarioFild(e.target.value)}
                       />
               </div>
            </div>
         </div>
      )
   }

   if (changedScenarioId) {
      return (
         <div className={style.triggersContainer}>
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

   const dynamicSearhData = (searchString) => {
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
      <div className={style.mainContainer}>
         <div className={style.controls}>
            <div
               className={style.createButton}
               onClick={() => setStatusCreateScenarioFild(true)}
            >
               Создать команду
            </div>
            <div className={style.hardLine}/>
            <div className={style.infoBlock}>
               <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
               <div className={style.infoText}>
                  <p>
                     Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.
                  </p>
                  <span>
                     Перейти в руководство
                  </span>
               </div>
            </div>
         </div>
         <div className={style.scenariosContainer}>
            <div className={style.inputContainer}>
               <div className={style.flexLeft}>
                  <h2>Команды бота</h2>
                  <div className={style.icon}>
                     <span className={style.tooltipText}>Команды бота</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <div className={style.searchContainer}>
                  <input
                     type={'text'}
                     className={style.searchString}
                     placeholder={'Найти команду'}
                     onInput={(e) => {
                        dynamicSearhData(e.target.value)
                     }}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"
                       enable-background="new 0 0 512 512" width="512px" height="512px" class="">
                     <g>
                        <g>
                           <path
                              d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z"
                              data-original="#000000" class="active-path" data-old_color="#000000" fill="#DADADA"/>
                        </g>
                     </g>
                  </svg>
               </div>
            </div>
            <table>
               <tr>
                  <td>Правило</td>
                  <td>Содержимое</td>
                  <td/>
               </tr>
               {
                  scenariosDataInFilter.length > 0 ? (
                     scenariosDataInFilter.map(elem => (
                        <tr>
                           <td
                              className={style.keyWord}
                              onClick={
                                 idEditTriggerText === elem.id ?
                                    null : () => changeScenarioId(elem.id)
                              }
                           >
                              Сообщение в точности совпадает с <span>{elem.trigger_text}</span>
                              <div className={style.mainEditScenario}>
                                 {
                                    idEditTriggerText === elem.id && (
                                       <ContextMenuForEditScenario
                                          onInput={(e) => editScenario(e, elem.id)}
                                          defaultValue={elem.trigger_text}
                                          setIdEditTriggerText={(id) => setIdEditTriggerText(id)}
                                       />
                                    )
                                 }
                              </div>
                           </td>
                           <td>
                              {elem.triggers.length} ответ
                           </td>
                           <td className={style.controlsImages}>
                              <div
                                 className={style.icon}
                                 // title={'Редактировать'}
                                 onClick={() => setIdEditTriggerText(elem.id)}
                              >
                                 <span className={style.tooltipText}>Редактировать</span>
                                 <img src={edit} alt={'edit'}/>
                              </div>

                              <div
                                 className={style.icon}
                                 onClick={() => copyScenario(elem.id)}
                              >
                                 <span className={style.tooltipText}>Копировать</span>
                                 <img src={copy} alt={'copy'}/>
                              </div>
                              <div
                                 className={style.icon}
                                 onClick={() => props.deleteScenario({
                                    botId: props.match.params.botId,
                                    idScenario: elem.id
                                 })}
                              >
                                 <span className={style.tooltipText}>Удалить</span>
                                 <img src={trash} alt={'trash'}/>
                              </div>
                           </td>

                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td className={style.keyWord}>
                           Ничего не найдено
                        </td>
                        <td/>
                        <td className={style.controlsImages}/>
                     </tr>
                  )
               }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScenariosContainer));
