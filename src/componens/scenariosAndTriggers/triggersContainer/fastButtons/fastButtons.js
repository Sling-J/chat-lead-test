import React, {useState} from 'react';
import style from './fastButtons.module.sass';
import ContextMenu from './contextMenu/contextMenu';
import {addNewTrigger, updateTrigger} from "../../../../actions/actionCreator";
import {connect} from 'react-redux';
import {ScenarioIdContext} from "../../../../utils/Contexts";
import {buttonsTypes} from "../../../../constants/defaultValues";
import {withRouter} from "react-router-dom";
import {markForButton} from "../../../../constants/markForButon";
import uid from 'uid';

const FastButtons = (props) => {
   const [indexOpenButton, setIndexOpenButton] = useState(false);

   const {
      type,
      index,
      changedScenario,
      changedTrigger,
      changedSlideOrElement,
      styleForContextMenu,
      changeTriggerId
   } = props;

   const appendFastButton = () => {
      const messagesCopy = changedTrigger.messages;
      let buttons = null;

      if (changedSlideOrElement || changedSlideOrElement === 0) {
         buttons = messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard;
      } else {
         buttons = messagesCopy[props.changedSocial][index].keyboard;
      }

      buttons.push({
         uid: uid(10),
         isEmpty: true,
         caption: 'Новая Кнопка',
         type: buttonsTypes.fast_buttons,
         secondType: buttonsTypes.text_buttons,
         boundTriggerId: changedTrigger.id,
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
      const allButtonsValues = allFastButtonsInMessage(true);

      const idx = allButtonsValues.findIndex(item => item.uid === indexButton);

      Object.assign(allButtonsValues[idx], buttonData, {
         isEmpty: isEmpty || false,
         type: buttonsTypes.fast_buttons,
         secondType: typeButton
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

   const allFastButtonsInMessage = noFilter => {
      const messagesCopy = changedTrigger.messages;
      const buttonsArray = changedSlideOrElement || changedSlideOrElement === 0 ?
         messagesCopy[props.changedSocial][index][type][changedSlideOrElement].keyboard
         : messagesCopy[props.changedSocial][index].keyboard;


      return noFilter
         ? buttonsArray
         : buttonsArray.filter(button => button.type === buttonsTypes.fast_buttons);
   };

   return (
      <div className={style.mainContainer}>
         {allFastButtonsInMessage().map((elem, indexArr) => (
            <div className={style.contextMenuContainer} onClick={() => setIndexOpenButton(elem.uid)} key={indexArr}>
               {elem.uid === indexOpenButton && (
                  <ScenarioIdContext.Consumer>
                     {scenarioId => {
                        return (
                           <ContextMenu
                              changeTriggerId={changeTriggerId}
                              buttonEditHandler={editButton}
                              typeButton={elem.isEmpty ? 'empty' : elem.secondType}
                              scenarioId={scenarioId}
                              indexButton={elem.uid}
                              buttonData={elem}
                              setIndexOpenButton={setIndexOpenButton}
                              changedTrigger={changedTrigger}
                              styleForContextMenu={styleForContextMenu}
                              index={index}
                           />
                        )
                     }}
                  </ScenarioIdContext.Consumer>
               )}

               <div className={style.appendedFastButton + ' ' + style.fastButtonCommon}>
                  <p className={style.appendedFastButtonText}>{elem.caption || 'Быстрый ответ'}</p>
                  {elem.isEmpty
                     ? null
                     : (
                        <p 
                           onClick={e => {
                              if (elem.secondType === buttonsTypes.text_buttons) {
                                 e.stopPropagation();
                                 changeTriggerId(elem.payload.trigger.id)
                              }
                           }}
                           className={style.appendedFastButtonIcon}
                        >
                           {markForButton[elem.secondType]}
                        </p>
                     )
                  }
               </div>
            </div>
         ))}

         <div className={style.appendFastBtnContainer}>
            {changedSlideOrElement || changedSlideOrElement === 0 ?
               allFastButtonsInMessage().length === 0 && (
                  <div className={style.newFastButton + ' ' + style.fastButtonCommon} onClick={appendFastButton}>
                     + Быстрый ответ
                  </div>
               )
               :
               allFastButtonsInMessage().length < 4 && (
                  <div className={style.newFastButton + ' ' + style.fastButtonCommon} onClick={appendFastButton}>
                     + Быстрый ответ
                  </div>
               )
            }
         </div>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
   appendTrigger: triggerData => dispatch(addNewTrigger(triggerData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FastButtons));
