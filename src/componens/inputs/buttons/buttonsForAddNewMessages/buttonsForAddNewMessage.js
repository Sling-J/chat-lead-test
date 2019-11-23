import React from 'react';
import style from './buttonsForAddNewMEssage.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../../actions/actionCreator";
import {addNewMessagesButtons} from "../../../../constants/addNewMessagesButtons";
import {defaultValuesForNewMessages} from "../../../../constants/defaultValues";

const ButtonsForAddNewMessage = (props) => {
   const {changedTrigger} = props;

   const updateTriggerNewMessageHandler = (type, optional) => {
      const messagesCopy = changedTrigger.messages;

      if (type === "timer") {
         messagesCopy[props.changedSocial].push(defaultValuesForNewMessages[optional]);
      } else {
         messagesCopy[props.changedSocial].push(defaultValuesForNewMessages[type]);
      }

      const updatedTrigger = {
         ...changedTrigger,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(updatedTrigger, false, props.changedSocial);
   };

   return (
      <div className={style.mainContainer}>
         {
            addNewMessagesButtons[props.changedSocial].map((elem, index) => (
               <div
                  key={index}
                  onClick={() => updateTriggerNewMessageHandler(elem.type, elem.optionalType)}
                  className={style.buttonElement}
               >
                  <div>
                     {elem.icon}
                  </div>
                  <p>{elem.label}</p>
               </div>
            ))
         }
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonsForAddNewMessage));
