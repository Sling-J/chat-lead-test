import React, {useState} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import uid from 'uid';

import {Popover} from 'antd';
import {addNewTrigger, updateTrigger} from "../../../../actions/actionCreator";
import {ScenarioIdContext} from "../../../../utils/Contexts";
import {buttonsTypes} from "../../../../constants/defaultValues";
import {markForButton} from "../../../../constants/markForButon";
import ButtonsMenu from './buttonsMenu/buttonsMenu'

import mStyle from '../../../../styles/messageButtons.module.scss';

const FastButtons = (props) => {
   const [indexOpenButton, setIndexOpenButton] = useState({
      open: false,
      id: null
   });

   const handleCloseButtonMenu = () => {
      setIndexOpenButton({
         open: false,
         id: null
      });
   };

   const {
      type,
      index,
      changedScenario,
      changedTrigger,
      changedSlideOrElement,
      changeTriggerId,
      destination
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

   const editButton = (typeButton, buttonData, indexButton, isEmpty, isCreateTrigger, mType) => {
      const messagesCopy = changedTrigger.messages;
      const allButtonsValues = allFastButtonsInMessage(true);

      const idx = allButtonsValues.findIndex(item => item.uid === indexButton);

      Object.assign(allButtonsValues[idx], buttonData, {
         isEmpty: isEmpty || false,
         type: buttonsTypes.fast_buttons,
         secondType: typeButton,
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
      <div className={mStyle.fastButtonsContainer}>
         {allFastButtonsInMessage().map((elem, idx) => (
            <Popover
               key={idx}
               trigger="click"
               visible={indexOpenButton.open && indexOpenButton.id === elem.uid}
               onVisibleChange={visible => setIndexOpenButton({open: visible, id: elem.uid})}
               placement="right"
               content={
                  <ScenarioIdContext.Consumer>
                     {scenarioId => (
                        <ButtonsMenu
                           changeTriggerId={changeTriggerId}
                           buttonEditHandler={editButton}
                           handleCloseButtonMenu={handleCloseButtonMenu}
                           changedSlideOrElement={changedSlideOrElement}
                           type={type}
                           typeButton={elem.isEmpty ? 'empty' : elem.secondType}
                           scenarioId={scenarioId}
                           indexButton={elem.uid}
                           buttonData={elem}
                           changedTrigger={changedTrigger}
                           index={index}
                           destination={destination}
                        />
                     )}
                  </ScenarioIdContext.Consumer>
               }
            >
               <div className={`${mStyle.appendedFastButton} ${mStyle.fastButton}`}>
                  <p className={mStyle.appendedFastButtonText}>{elem.caption || 'Быстрый ответ'}</p>
                  {elem.isEmpty
                     ? null
                     : (
                        <p
                           onClick={e => {
                              if (elem.secondType === buttonsTypes.text_buttons) {
                                 e.stopPropagation();
                                 changeTriggerId(elem.payload.trigger_id)
                              }
                           }}
                           className={mStyle.appendedFastButtonIcon}
                        >
                           {markForButton[elem.secondType]}
                        </p>
                     )
                  }
               </div>
            </Popover>
         ))}

         <div
            className={`${mStyle.appendFastButton} ${mStyle.fastButton}`}
            onClick={appendFastButton}
         >
            + Быстрый ответ
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

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(FastButtons);
