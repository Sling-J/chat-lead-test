import React from 'react';
import style from './controls.module.sass';
import {connect} from "react-redux";
import {updateTrigger} from "../../../../../actions/actionCreator";
import {withRouter} from "react-router-dom";

const Controls = (props) => {
   const {handleCloseButtonMenu, typeButton, changedTrigger, indexButton, index} = props;

   const deleteButton = () => {
      const messagesCopy = changedTrigger.messages;
      messagesCopy[props.changedSocial][index].keyboard = messagesCopy[props.changedSocial][index].keyboard.filter(item => item.uid !== indexButton);

      const triggerData = {
         ...changedTrigger,
         index,
         type: typeButton,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(triggerData, null, props.changedSocial);

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

const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, fileData, social) => dispatch(updateTrigger(triggerData, fileData, social)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Controls));