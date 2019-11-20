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
// import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {markForButton} from "../../../constants/markForButon";


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
      styleForContextMenu
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
         caption: 'Новая Кнопка',
         isEmpty: true,
         type: buttonsTypes.text_buttons
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

   const allButtonsInMessage = () => {
      const messagesCopy = changedTrigger.messages;
      const buttonsArray = changedSlideOrElement || changedSlideOrElement === 0 ?
         messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard
         : messagesCopy[props.changedSocial][index].keyboard;

      return buttonsArray;
   };

   const editButton = (typeButton, buttonData, indexButton, isEmpty, isCreateTrigger) => {
      const messagesCopy = changedTrigger.messages;
      const buttonsValues = allButtonsInMessage();

      Object.assign(buttonsValues[indexButton], buttonData, {
         isEmpty: isEmpty || false,
         type: typeButton
      });

      messagesCopy[props.changedSocial][index].keyboard = buttonsValues;

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

   return (
      <div className={style.mainContainer}>
         {allButtonsInMessage().map((elem, indexArr) => (
            <div className={style.buttonElement} onClick={() => setIndexOpenButton(indexArr)}>
               <div>
                  {indexOpenButton === indexArr && (
                     <ScenarioIdContext.Consumer>
                        {scenarioId => (
                           <ContextMenu
                              buttonEditHandler={editButton}
                              typeButton={elem.isEmpty ? 'empty' : elem.type}
                              scenarioId={scenarioId}
                              indexButton={indexArr}
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
                        {elem.caption || 'Новая Кнопка'}
                        <span>
                           {elem.isEmpty
                              ? <FontAwesomeIcon icon={faCircle}/>
                              : markForButton[elem.type]
                           }
                        </span>
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
const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
   appendTrigger: triggerData => dispatch(addNewTrigger(triggerData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonsContainer));
