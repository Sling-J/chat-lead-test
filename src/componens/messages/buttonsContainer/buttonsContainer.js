import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import uid from 'uid';

import {Popover} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import Button from '@material-ui/core/Button';

import {markForButton} from "../../../constants/markForButon";
import {buttonsTypes} from "../../../constants/defaultValues";
import {addNewTrigger, updateTrigger} from "../../../actions/actionCreator";
import {ScenarioIdContext} from "../../../utils/Contexts";
import ButtonsMenu from './buttonsMenu/buttonsMenu'

import style from '../../../styles/messageButtons.module.scss';
import {compose} from "redux";

const ButtonsContainer = props => {
	const {
		type, index,
		changedSlideOrElement,
		changedScenario,
		changeTriggerId,
      changedTrigger,
      destination
	} = props;
	
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
                              changedSlideOrElement={changedSlideOrElement}
                              buttonEditHandler={editButton}
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
                  <Button
                     key={idx}
                     className={`${style.keyboardButton} ${indexOpenButton.open && elem.uid === indexOpenButton.id && style.activeKeyboardBtn}`}
                  >
                     <p className={style.keyboardButtonText}>{elem.caption || 'Новая Кнопка'}</p>
                     <p
                        className={style.keyboardButtonIcon}
                        onClick={e => {
                           if (elem.secondType === buttonsTypes.text_buttons && !elem.isEmpty) {
                              e.stopPropagation();
                              changeTriggerId(elem.payload.trigger_id)
                           }
                        }}
                     >
                        {elem.isEmpty
                           ? <FontAwesomeIcon icon={faCircle} className={style.keyboardButtonIcon1}/>
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

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ButtonsContainer);
