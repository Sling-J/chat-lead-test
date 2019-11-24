import React, {useState} from 'react';
import style from './buttonsContainer.module.sass';
import {buttonsTypes} from "../../../constants/defaultValues";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import ContextMenu from './contextMenu/contextMenu';
import {ScenarioIdContext} from "../../../utils/Contexts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import {markForButton} from "../../../constants/markForButon";

import uid from 'uid';

const ButtonsContainer = (props) => {
   const [indexOpenButton, setIndexOpenButton] = useState(false);

   const {
      type,
      index,
      changedScenario,
      changedTrigger,
      changedSlideOrElement,
      styleForControls,
      styleForButton,
      styleForCaption,
      styleForContextMenu,
      changeTriggerId
   } = props;

   const appendNewButton = () => {
      const messagesCopy = changedTrigger.messages;
      let buttons = null;

      if (changedSlideOrElement || changedSlideOrElement === 0) {
         buttons = messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard;
      } else {
         buttons = messagesCopy[props.changedSocial][index].keyboard;
      }

      buttons.push({
         uid: uid(6),
         isEmpty: true,
         caption: 'Новая Кнопка',
         type: buttonsTypes.text_buttons,
         secondType: buttonsTypes.text_buttons,
         boundTriggerId: changedTrigger.id
      });

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(triggerData, null, props.changedSocial);
   };

   const editButton = (typeButton, buttonData, indexButton, isEmpty, isCreateTrigger) => {
      const messagesCopy = changedTrigger.messages;
      const allButtonsValues = allButtonsInMessage(true);

      const idx = allButtonsValues.findIndex(item => item.uid === indexButton);

      Object.assign(allButtonsValues[idx], buttonData, {
         isEmpty: isEmpty || false,
         type: typeButton
      });

      messagesCopy[props.changedSocial][index].keyboard = allButtonsValues;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      if (isCreateTrigger) {
         const trigger = {
            scenario_id: changedScenario.id,
            manager_id: props.match.params.botId,
         };

         props.appendTrigger(trigger);
      }

      props.updateTrigger(triggerData, null, props.changedSocial);
   };

   const allButtonsInMessage = noFilter => {
      const messagesCopy = changedTrigger.messages;

      const buttons = changedSlideOrElement || changedSlideOrElement === 0 ?
         messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard
         : messagesCopy[props.changedSocial][index].keyboard;

      return noFilter 
         ? buttons 
         : buttons.filter(button => button.type !== buttonsTypes.fast_buttons)
   };

   return (
      <div className={style.mainContainer}>
         {allButtonsInMessage().map((elem, indexArr) => (
            <div className={style.buttonElement} onClick={() => setIndexOpenButton(elem.uid)} key={elem.uid}>
               <div>
                  {elem.uid === indexOpenButton && (
                     <ScenarioIdContext.Consumer>
                        {scenarioId => (
                           <ContextMenu
                              changeTriggerId={changeTriggerId}
                              buttonEditHandler={editButton}
                              typeButton={elem.isEmpty ? 'empty' : elem.type}
                              scenarioId={scenarioId}
                              indexButton={elem.uid}
                              buttonData={elem}
                              setIndexOpenButton={setIndexOpenButton}
                              changedTrigger={changedTrigger}
                              styleForContextMenu={styleForContextMenu}
                              index={index}
                           />
                        )}
                     </ScenarioIdContext.Consumer>
                  )}
                  <div className={style.button} style={styleForButton}>
                     <div className={style.captionContainer} style={styleForCaption}>
                        <p className={style.captionContainerText}>{elem.caption || 'Новая Кнопка'}</p>
                        <p className={style.captionContainerIcon}>
                           {elem.isEmpty
                              ? <FontAwesomeIcon icon={faCircle} color="red"/>
                              : markForButton[elem.type]
                           }
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         ))}

         {changedSlideOrElement || changedSlideOrElement === 0 ?
            allButtonsInMessage().length === 0 && (
               <div
                  className={style.variable}
                  style={styleForControls || {}}
                  onClick={() => appendNewButton()}
               >
                  <h2>+ Добавить кнопку</h2>
               </div>
            )
            : allButtonsInMessage().length < 3 && (
            <div
               className={style.variable}
               style={styleForControls || {}}
               onClick={() => appendNewButton()}
            >
               <h2>+ Добавить кнопку</h2>
            </div>
         )}

      </div>
   )
};
const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
   appendTrigger: triggerData => dispatch(addNewTrigger(triggerData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonsContainer));
