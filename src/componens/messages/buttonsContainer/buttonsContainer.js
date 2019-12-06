import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import uid from 'uid';

import {Popover} from 'antd';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

import {markForButton} from "../../../constants/markForButon";
import {buttonsTypes} from "../../../constants/defaultValues";
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import {ScenarioIdContext} from "../../../utils/Contexts";
import ButtonsMenu from './buttonsMenu/buttonsMenu'

import style from '../../../styles/messageButtons.module.scss';

const ButtonsContainer = (props) => {
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
      <div className={style.keyboardButtonsContainer}>
         {allButtonsInMessage().map((elem, idx) => (
            <>
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
                  }
               >
                  <Button
                     key={idx}
                     className={`${style.keyboardButton} ${indexOpenButton.open && elem.uid === indexOpenButton.id && style.activeKeyboardBtn}`}
                  >
                     <p className={style.keyboardButtonText}>{elem.caption || 'Новая Кнопка'}</p>
                     <p className={style.keyboardButtonIcon}>
                        {elem.isEmpty
                           ? <FontAwesomeIcon icon={faCircle} color="red"/>
                           : markForButton[elem.type]
                        }
                     </p>
                  </Button>

               </Popover>
            </>
         ))}

         <Button
            className={style.appendKeyboardButton}
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
