import React, {useState, useEffect} from 'react';
import style from './autorideContainer.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {
   addNewAutoride,
   changeScenarioId,
   deleteAutoride,
   editScenario,
   getAllScenariesForBot,
   getAutorideLinks
} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import vk from '../../images/imageForTable/vk-icon.png';
import telegram from '../../images/imageForTable/tlg-icon.png';
import facebook from '../../images/imageForTable/fb-icon.png';
import viber from '../../images/imageForTable/wh-icon.png';
import edit from '../../images/buttons/edit.png';
import trash from '../../images/buttons/trash.png';
import copy from '../../images/duplicate.jpg';
import leftArrow from '../../svg/db/left-arrow.svg';
import ContextMenuForEditAutoride from "./contextMenuForEditAutoride/contextMenuForEditAutoride";
import {destinationScenario} from "../../constants/defaultValues";


const AutorideContainer = (props) => {
   const {changeScenarioId, changedScenarioId} = props;

   // const [changedScenarioId, changeScenarioId] = useState(false);
   const [autoridesDataInFilter, setautoridesDataInFilter] = useState([]);
   const [isOpenCreateScenarioFild, setStatusCreateScenarioFild] = useState(false);
   const [idEditTriggerText, setIdEditTriggerText] = useState(false);
   const scenariosForAutoride = [];
   props.botScenarios.filter(elem => elem.destination === destinationScenario.autoride).forEach(elem => {
      scenariosForAutoride.push(elem.id);
   });


   useEffect(() => {
      // console.log(props.autoridesData);
      let changedAutorideData = null;
      if (changedScenarioId && props.autoridesData) {
         changedAutorideData
            = props.autoridesData.filter(elem => elem.scenario.id === changedScenarioId)[0];
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
      props.appendAutoride(props.match.params.botId, isOpenCreateScenarioFild);
      // // props.addScenario(props.match.params.botId, destinationScenario.default, isOpenCreateScenarioFild);
      setStatusCreateScenarioFild(false);
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
               <div className={style.next} onClick={newAutorideHandler}>Далее</div>
            </div>
            <div className={style.contentContainer}>
               <h2>Воронка</h2>
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


   if (changedScenarioId && props.botScenarios.length > 0 && scenariosForAutoride.indexOf(changedScenarioId) !== -1) {
      return (
         <div className={style.triggersContainer}>
            <ScenarioIdContext.Provider value={changedScenarioId}>
               <ScenarioIdContext.Consumer>
                  {scenarioId => (
                     <TriggersContainer
                        changedScenarioId={changedScenarioId}
                        scenarioId={scenarioId}
                        changeScenarioId={changeScenarioId}
                        autoridesLinks={props.autoridesLinks}
                     />
                  )}
               </ScenarioIdContext.Consumer>
            </ScenarioIdContext.Provider>
         </div>
      )
   }


   const dynamicSearchData = (searchString) => {
      const scenariosData = [];
      props.autoridesData.forEach(elem => {
         if (searchString) {
            if (elem.scenario.trigger_text.toLowerCase().indexOf(searchString.toLowerCase()) != -1) {
               scenariosData.push(elem);
            }
         } else if (!searchString) {
            scenariosData.push(elem);
         }
      });
      setautoridesDataInFilter(scenariosData);
   };


   return (
      <div className={style.mainContainer}>
         <div className={style.controls}>
            <div className={style.createButton} onClick={() => setStatusCreateScenarioFild(true)}>
               Создать автоворонку
            </div>
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
                  <h2>Автоворонка</h2>
                  <div className={style.icon}>
                     <span className={style.tooltipText}>Автоворонка</span>
                     <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                  </div>
               </div>
               <div className={style.searchContainer}>
                  <input
                     type={'text'}
                     className={style.searchString}
                     placeholder={'Найти автоворонку'}
                     onInput={(e) => dynamicSearchData(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512"
                       enableBackground="new 0 0 512 512" width="512px" height="512px" class="">
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
                  <td>Название</td>
                  <td>Каналы</td>
                  <td/>
               </tr>
               {
                  autoridesDataInFilter.length > 0 ? (
                     autoridesDataInFilter.map(elem => (
                        <tr>
                           <td
                              className={style.keyWord}
                              // onClick={() => changeScenarioId(elem.scenario.id)}
                              onClick={
                                 idEditTriggerText === elem.scenario.id ?
                                    null :
                                    () => changeScenarioId(elem.scenario.id)
                              }
                           >
                              Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                              <div className={style.mainEditScenario}>
                                 {
                                    idEditTriggerText === elem.scenario.id && (
                                       <ContextMenuForEditAutoride
                                          onInput={(e) => editScenario(e, elem.scenario.id)}
                                          defaultValue={elem.scenario.trigger_text}
                                          setIdEditTriggerText={(id) => setIdEditTriggerText(id)}
                                       />
                                    )
                                 }
                              </div>
                           </td>
                           <td>
                              <img src={vk} alt={'vk'}/>
                              <img src={telegram} alt={'tg'}/>
                              <img src={facebook} alt={'fb'}/>
                              <img src={viber} alt={'viber'}/>
                           </td>
                           <td className={style.controlsImages}>
                              <div
                                 className={style.icon}
                                 onClick={() => setIdEditTriggerText(elem.scenario.id)}
                              >
                                 <span className={style.tooltipText}>Редактировать</span>
                                 <img src={edit} alt={'edit'}/>
                              </div>
                              <div className={style.icon}>
                                 <span className={style.tooltipText}>Копировать</span>
                                 <img src={copy} alt={'copy'}/>
                              </div>
                              <div
                                 className={style.icon}
                                 onClick={() => props.deleteAutoride(props.match.params.botId, elem.id)}
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
   const {autoridesData, isFetching, error, autoridesLinks} = state.autoridesReducers;
   const {botScenarios, changedScenarioId} = state.singleBotReducers;


   return {
      autoridesData, isFetching, error, changedScenarioId, autoridesLinks, botScenarios
   }
};

const mapDispatchToProps = dispatch => ({
   appendAutoride: (managerId, name) => dispatch(addNewAutoride(managerId, name)),
   deleteAutoride: (managerId, autorideId) => dispatch(deleteAutoride(managerId, autorideId)),
   editScenario: (scenarioData) => dispatch(editScenario(scenarioData)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId)),
   getAutoridesLinks: (autorideData) => dispatch(getAutorideLinks(autorideData)),
   getAllScenariesForBot: (idBot) => dispatch(getAllScenariesForBot(idBot))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AutorideContainer));
