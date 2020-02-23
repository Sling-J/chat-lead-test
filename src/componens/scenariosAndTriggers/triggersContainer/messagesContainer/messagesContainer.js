import React from 'react';
import {connect} from "react-redux";

import {fileDefinition} from "../../../../utils/fileDefinition/fileDefinition";

import style from './messagesContainer.module.sass';

const MessagesContainer = ({
   changedTrigger, updateTriggerUpdateMessageHandler,
   updateTriggerDeleteMessageHandler, changedScenario,
   changeTriggerId, changedSocial, destination
}) => {
   return changedTrigger.messages[changedSocial].map((elem, index) => (
      <div className={style.message} key={index}>
         {fileDefinition(
            Object.keys(elem)[0],
            elem,
            updateTriggerUpdateMessageHandler,
            index,
            updateTriggerDeleteMessageHandler,
            changedTrigger,
            changedScenario,
            changeTriggerId,
            destination
         )}
      </div>
   ));
};

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
}))(MessagesContainer);
