import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import CopyToClipboard from "../../Containers/CopyToClipboard/CopyToClipboard";
import ButtonsForAddNewMessage from '../../inputs/buttons/buttonsForAddNewMessages/buttonsForAddNewMessage';
import SideBarSocial from '../../sideBarSocial/sideBarSocial';
import MessagesContainer from './messagesContainer/messagesContainer';
import BroadCastMenu from '../../broadCastContainer/broadCastMenu/broadCastMenu';
import {destinationScenario} from "../../../constants/defaultValues";
import Triggers from './triggers/triggers';

import {Spin} from 'antd';
import leftArrow from "../../../svg/db/left-arrow.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClone} from "@fortawesome/free-regular-svg-icons";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

import style from './triggersContainer.module.sass';

import {
   addNewTrigger,
   updateTrigger,
   editScenario,
   editTriggerCaption
} from "../../../actions/actionCreator";
import {sliceExtraText} from "../../../utils/sliceExtraText";

const TriggersContainer = (props) => {
   const changedScenario = props.botScenarios.filter(elem => elem.id === props.scenarioId)[0];
   const triggers = changedScenario && changedScenario.triggers;
   const mainTriggerIdx = 0;

   const [activeStepCaptionEditor, setActiveStepCaptionEditor] = useState(false);
   const [changedTriggerId, changeTriggerId] = useState(triggers && triggers[mainTriggerIdx].id);
   const [editedTriggerText, setEditedTriggerText] = useState('');

   const changedTrigger = triggers && triggers.filter(elem => elem.id === changedTriggerId)[0];
   const activeStep = changedScenario && changedScenario.triggers.find(el => el.id === changedTriggerId);

   useEffect(() => {
      if (triggers && triggers.length === 1) {
         changeTriggerId(triggers[mainTriggerIdx].id)
      }
   }, [triggers]);

   useEffect(() => {
      if (activeStep === undefined) {
         changeTriggerId(triggers[mainTriggerIdx].id)
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
      const updationData = {
         type: typeFile,
      };

      if (typeFile === 'text' || typeFile === 'payment') {
         Object.assign(updationData, {text: e.target.value})
      } else if (typeFile === 'send_time') {
         messagesCopy[props.changedSocial][index].text = e.target.value;
      } else {
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
               <div className={style.before} onClick={() => props.changeScenarioId(false)}>
                  <img src={leftArrow} alt={'back'}/>
                  Назад к списку
               </div>
               <div className={style.next} onClick={() => props.changeScenarioId(false)}>
                  Сохранить
               </div>
            </div>
            <div
               className={style.saveDataStatus}
            >
               {props.isFetching ? 'Идет сохранение' : 'Ваши данные сохранены!'}
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
                  <>
                     <MessagesContainer
                        changeTriggerId={changeTriggerId}
                        changedTrigger={changedTrigger}
                        changedScenario={changedScenario}
                        updateTriggerUpdateMessageHandler={updateTriggerUpdateMessageHandler}
                        updateTriggerDeleteMessageHandler={updateTriggerDeleteMessageHandler}
                     />
                     <div className={style.controls}>
                        <ButtonsForAddNewMessage
                           changedTrigger={changedTrigger}
                        />
                     </div>
                  </>
               )}
               <div className={style.broadCastMenu}>
                  {
                     changedScenario && changedScenario.destination === destinationScenario.broadcast && (
                        <BroadCastMenu
                           broadCastId={props.broadCastId}
                           changedTrigger={changedTrigger}
                        />
                     )
                  }
               </div>
            </div>
         </div>
         <div className={style.social}>
            <div className={style.linkContainer}>
               {props.isAutoRide ? props.autoridesLinks ? (
                  <>
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
                  </>
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

const mapStateToProps = state => {
   const {botScenarios, isFetching, error, changedSocial} = state.singleBotReducers;
   const {botsData} = state.botsReducers;

   return {
      botScenarios, isFetching, error, botsData, changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
   updateTriggerCaption: triggerData => dispatch(editTriggerCaption(triggerData)),
   appendTrigger: triggerData => dispatch(addNewTrigger(triggerData)),
   editScenario: scenarioData => dispatch(editScenario(scenarioData))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TriggersContainer));
