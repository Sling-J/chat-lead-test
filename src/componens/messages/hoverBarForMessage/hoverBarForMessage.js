import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";

import style from './hoverBarForMessage.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltDown, faLongArrowAltUp, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faClone} from "@fortawesome/free-regular-svg-icons";
import {updateTrigger} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";

const HoverBarForMessage = (props) => {
   const {styleForBar, index, changedTrigger} = props;

   const deleteMessage = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[props.changedSocial].splice(index, 1);

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(updatedTrigger);
   };

   const cloneMessage = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[props.changedSocial].splice(index, 0, messagesCopy[props.changedSocial][index]);

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };
      props.updateTrigger(updatedTrigger);
   };

   const messageInUp = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[props.changedSocial].splice(index - 1, 0, messagesCopy[props.changedSocial][index]);
      messagesCopy[props.changedSocial].splice(index + 1, 1);

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(updatedTrigger);
   };

   const messageInDown = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[props.changedSocial].splice(index + 2, 0, messagesCopy[props.changedSocial][index]);
      messagesCopy[props.changedSocial].splice(index, 1);

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(updatedTrigger);
   };

   return (
      <div className={style.mainContainer} style={styleForBar}>
         <p onClick={deleteMessage}>
            <FontAwesomeIcon icon={faTimes}/>
         </p>

         <p onClick={messageInUp}>
            <FontAwesomeIcon icon={faLongArrowAltUp}/>
         </p>

         <p onClick={messageInDown}>
            <FontAwesomeIcon icon={faLongArrowAltDown}/>
         </p>

         <p onClick={cloneMessage}>
            <FontAwesomeIcon icon={faClone}/>
         </p>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData) => dispatch(updateTrigger(triggerData)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(HoverBarForMessage);
