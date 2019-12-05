import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import uid from 'uid';

import MuiPopover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

import {markForButton} from "../../../constants/markForButon";
import {buttonsTypes} from "../../../constants/defaultValues";
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import {ScenarioIdContext} from "../../../utils/Contexts";
import ButtonsMenu from './buttonsMenu/buttonsMenu'

import style from './buttonsContainer.module.sass';

const ButtonsContainer = (props) => {
   const [anchorEl, setAnchorEl] = React.useState({
      el: null,
      id: null
   });

   const handleCloseButtonMenu = () => {
      setAnchorEl({
         el: null,
         id: null
      });
   };

   const {
      type,
      index,
      changedScenario,
      changedTrigger,
      changedSlideOrElement,
      styleForControls,
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

   const editButton = (typeButton, buttonData, indexButton, isEmpty, isCreateTrigger, secondTypeButton) => {
      const messagesCopy = changedTrigger.messages;
      const allButtonsValues = allButtonsInMessage(true);

      const idx = allButtonsValues.findIndex(item => item.uid === indexButton);

      Object.assign(allButtonsValues[idx], buttonData, {
         isEmpty: isEmpty || false,
         type: typeButton,
         secondType: secondTypeButton
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
         {allButtonsInMessage().map((elem, idx) => (
            <>
               <Button
                  key={idx}
                  onClick={e => setAnchorEl({
                     el: e.currentTarget,
                     id: elem.uid
                  })}
                  className={`${style.buttonElement} ${elem.uid === anchorEl.id && style.activeBtn}`}
               >
                  <p className={style.captionContainerText}>{elem.caption || 'Новая Кнопка'}</p>
                  <p className={style.captionContainerIcon}>
                     {elem.isEmpty
                        ? <FontAwesomeIcon icon={faCircle} color="red"/>
                        : markForButton[elem.type]
                     }
                  </p>
               </Button>
               <MuiPopover
                  id={elem.uid === anchorEl.id ? 'simple-popover' : undefined}
                  open={elem.uid === anchorEl.id}
                  anchorEl={anchorEl.el}
                  onClose={handleCloseButtonMenu}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                  }}
               >
                  <ScenarioIdContext.Consumer>
                     {scenarioId => (
                        <ButtonsMenu
                           changeTriggerId={changeTriggerId}
                           handleCloseButtonMenu={handleCloseButtonMenu}
                           buttonEditHandler={editButton}
                           typeButton={elem.isEmpty ? 'empty' : elem.secondType}
                           scenarioId={scenarioId}
                           indexButton={elem.uid}
                           buttonData={elem}
                           changedTrigger={changedTrigger}
                           index={index}
                        />
                     )}
                  </ScenarioIdContext.Consumer>
               </MuiPopover>
            </>
         ))}

         <Button
            className={style.appendNewButton}
            style={styleForControls || {}}
            onClick={() => appendNewButton()}
         >
            + Добавить кнопку
         </Button>
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
