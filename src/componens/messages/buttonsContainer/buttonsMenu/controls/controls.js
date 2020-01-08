import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {updateTrigger} from "../../../../../actions/actionCreator";

import style from './controls.module.sass';

const Controls = ({handleCloseButtonMenu, typeButton, type, changedTrigger, indexButton, index, changedSocial, match, updateTrigger, changedSlideOrElement}) => {
   const deleteButton = () => {
      const messagesCopy = changedTrigger.messages;

      if (changedSlideOrElement || changedSlideOrElement === 0) {
         messagesCopy[changedSocial][index][type][changedSlideOrElement].keyboard = messagesCopy[changedSocial][index][type][changedSlideOrElement].keyboard
            .filter(item => item.uid !== indexButton);
      } else {
         messagesCopy[changedSocial][index].keyboard = messagesCopy[changedSocial][index].keyboard
            .filter(item => item.uid !== indexButton);
      }

      const triggerData = {
         ...changedTrigger,
         index,
         type: typeButton,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(triggerData, null, changedSocial);
   };

   return (
      <div className={style.controls}>
         <div className={style.controlsButton} onClick={deleteButton}>Удалить</div>
         <div
            className={style.controlsButtonAccept}
            onClick={handleCloseButtonMenu}
         >
            Добавить
         </div>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, fileData, social) => dispatch(updateTrigger(triggerData, fileData, social)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Controls);
