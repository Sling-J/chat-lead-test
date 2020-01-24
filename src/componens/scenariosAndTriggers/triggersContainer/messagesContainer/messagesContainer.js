import React from 'react';
import style from './messagesContainer.module.sass';
import {fileDefinition} from "../../../../utils/fileDefinition/fileDefinition";
import {connect} from "react-redux";

const MessagesContainer = ({
   changedTrigger, updateTriggerUpdateMessageHandler,
   updateTriggerDeleteMessageHandler, changedScenario,
   changeTriggerId, changedSocial
}) => changedTrigger.messages[changedSocial].map((elem, index) => (
   <div className={style.message} key={index}>
      {fileDefinition(
         Object.keys(elem)[0],
         elem,
         updateTriggerUpdateMessageHandler,
         index,
         updateTriggerDeleteMessageHandler,
         changedTrigger,
         changedScenario,
         changeTriggerId
      )}
   </div>
));

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
}))(MessagesContainer);
