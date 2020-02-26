import React, {Fragment, useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {destinationScenario} from "../../../constants/defaultValues";

import CopyToClipboard from "../../Containers/CopyToClipboard.jsx";
import ButtonsForAddNewMessage from '../../inputs/buttons/buttonsForAddNewMessages/buttonsForAddNewMessage';
import SideBarSocial from '../../sideBarSocial/sideBarSocial';
import MessagesContainer from './messagesContainer/messagesContainer';
import BroadCastMenu from '../../broadCastContainer/broadCastMenu/broadCastMenu';
import Triggers from './triggers/triggers';

import {getTags} from "../../../ducks/Tags";

import {Spin} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClone} from "@fortawesome/free-regular-svg-icons";
import {faPencilAlt, faCheck, faSpinner} from "@fortawesome/free-solid-svg-icons";
import leftArrow from "../../../svg/db/left-arrow.svg";

import style from './triggersContainer.module.sass';

import {
   addNewTrigger,
   updateTrigger,
   editScenario,
   editTriggerCaption,
   getAllBroadCasts
} from "../../../actions/actionCreator";
import {sliceExtraText} from "../../../utils/textValidation";

const TriggersContainer = props => {
   const changedScenario = props.botScenarios.filter(elem => elem.id === props.scenarioId)[0];
   const triggers = changedScenario && changedScenario.triggers;
   const mainTriggerIdx = 0;

   const [activeStepCaptionEditor, setActiveStepCaptionEditor] = useState(false);
   const [changedTriggerId, changeTriggerId] = useState(triggers && triggers[mainTriggerIdx].id);
   const [editedTriggerText, setEditedTriggerText] = useState('');

   const changedTrigger = triggers && triggers.filter(elem => elem.id === changedTriggerId)[0];
   const activeStep = changedScenario && changedScenario.triggers.find(el => el.id === changedTriggerId);

   useEffect(() => {
      props.getTags(props.match.params.botId);

      if (triggers && triggers.length === 1) {
         triggers && triggers[mainTriggerIdx] && changeTriggerId(triggers[mainTriggerIdx].id)
      }
   }, [triggers]);

   useEffect(() => {
      if (activeStep === undefined) {
         triggers && triggers[mainTriggerIdx] && changeTriggerId(triggers[mainTriggerIdx].id)
      } else {
         setEditedTriggerText(activeStep.caption);
      }
   }, [activeStep]);

   const newTriggerHandler = () => {
      const triggerData = {
         scenario_id: changedScenario.id,
         manager_id: props.match.params.botId,
      };

      props.appendTrigger(triggerData);
   };

   const updateTriggerDeleteMessageHandler = index => {
      console.log(index);
   };

   const updateTriggerUpdateMessageHandler = (e, index, typeFile) => {
      const messagesCopy = changedTrigger.messages;
      let updationData;

      if (typeFile === 'text' || typeFile === 'payment' || typeFile === 'send_time' || typeFile === 'customs') {
         messagesCopy[props.changedSocial][index].text = e.target.value;
      } else if (typeFile === 'failure_trigger_text') {
         messagesCopy[props.changedSocial][index].failure_trigger_text = e.target.value;
      } else {
         updationData = {
            type: typeFile,
         };

         Object.assign(updationData, {file: e.target.files[0]})
		}

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(updatedTrigger, updationData, props.changedSocial);
   };

   const editTriggerText = (e, id) => {
      e.preventDefault();

      props.updateTriggerCaption({
         id,
         botId: props.match.params.botId,
         caption: editedTriggerText
      });

      setActiveStepCaptionEditor(false);
   };

   return (
      <div className={style.mainContainer}>
         <div className={style.sideContainer}>
            <div className={style.buttonsContainer}>
               <div className={style.before} onClick={() => {
                  props.changeScenarioId(false);
                  props.getBroadcast && props.getAllBroadCasts(props.match.params.botId);
               }}>
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </div>
               <div className={style.next} onClick={() => props.changeScenarioId(false)}>
                  Сохранить
               </div>
            </div>
            <div className={style.saveDataStatus}>
               {props.loadingOfTrigger
                  ? (<span><FontAwesomeIcon icon={faSpinner} className={style.awesomeSpin}/> Идет сохранение ...</span>)
                  : (<span><FontAwesomeIcon icon={faCheck}/> Ваши данные сохранены!</span>)
               }
            </div>
            <Triggers
               changeTriggerId={changeTriggerId}
               changedScenario={changedScenario}
               changedTriggerId={changedTriggerId}
            />
            <div onClick={newTriggerHandler} className={style.newTriggerContainer}>+ Новое сообщение</div>
         </div>
         <div className={style.triggerConstructor}>
            <div className={style.contentContainer}>
               <div
                  className={style.contentHeader}
                  onClick={() => setActiveStepCaptionEditor(true)}
               >
                  {activeStepCaptionEditor ?
                     <form onSubmit={e => editTriggerText(e, activeStep.id)}>
                        <input
                           type={'text'}
                           autoFocus={true}
                           onBlur={e => editTriggerText(e, activeStep.id)}
                           onChange={e => setEditedTriggerText(e.target.value)}
                           value={editedTriggerText}
                        />
                     </form>
                     :
                     <p className={style.contentHeaderText}>
                        {activeStep && activeStep.caption}
                        <span><FontAwesomeIcon icon={faPencilAlt}/></span>
                     </p>
                  }
               </div>

               {changedTrigger && (
                  <Fragment>
                     <MessagesContainer
                        changedTrigger={changedTrigger}
                        changeTriggerId={changeTriggerId}
                        changedScenario={changedScenario}
                        updateTriggerUpdateMessageHandler={updateTriggerUpdateMessageHandler}
                        updateTriggerDeleteMessageHandler={updateTriggerDeleteMessageHandler}
                        destination={props.destination}
                     />
                     <div className={style.controls}>
                        <ButtonsForAddNewMessage
                           changedTrigger={changedTrigger}
                        />
                     </div>
                  </Fragment>
               )}
               <div className={style.broadCastMenu}>
                  {changedScenario && changedScenario.destination === destinationScenario.broadcast && (
                     <BroadCastMenu
                        broadCastId={props.broadCastId}
                        changedTrigger={changedTrigger}
                     />
                  )}
               </div>
            </div>
         </div>
         <div className={style.social}>
            <div className={style.linkContainer}>
               {props.isAutoRide ? props.autoridesLinks ? (
                  <Fragment>
                     <div className={style.autorideLink}>
                        <a
                           href={props.autoridesLinks[props.changedSocial].includes('http') ?
                              `${props.autoridesLinks[props.changedSocial]}` :
                              `https://${props.autoridesLinks[props.changedSocial]}`
                           }
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           {props.autoridesLinks[props.changedSocial].length && sliceExtraText(props.autoridesLinks[props.changedSocial], 27)}
                        </a>
                     </div>

                     <CopyToClipboard>
                        {({copy}) => (
                           <div
                              className={style.linkButton}
                              onClick={() => copy(props.autoridesLinks[props.changedSocial])}
                           >
                              <p><FontAwesomeIcon icon={faClone}/></p>
                              <p>Копировать ссылку</p>
                           </div>
                        )}
                     </CopyToClipboard>
                  </Fragment>
               ) : (
                  <div className={style.autorideLinkSpin}>
                     <Spin/>
                  </div>
               ) : null}
            </div>
            <SideBarSocial
               changedTrigger={changedTrigger}
            />
         </div>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers, botsReducers}) => ({
   botScenarios: singleBotReducers.botScenarios,
   loadingOfTrigger: singleBotReducers.loadingOfTrigger,
   error: singleBotReducers.error,
   changedSocial: singleBotReducers.changedSocial,
   botsData: botsReducers.botsData,
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
   updateTriggerCaption: triggerData => dispatch(editTriggerCaption(triggerData)),
   getAllBroadCasts: botId => dispatch(getAllBroadCasts(botId)),
   appendTrigger: triggerData => dispatch(addNewTrigger(triggerData)),
   editScenario: scenarioData => dispatch(editScenario(scenarioData)),
   getTags: botId => dispatch(getTags(botId)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TriggersContainer);
