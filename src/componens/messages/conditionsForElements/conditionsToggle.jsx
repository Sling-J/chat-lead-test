import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import style from "./conditionsForElements.module.scss";
import {updateTrigger} from "../../../actions/actionCreator";

const ConditionsToggle = ({index, changedTrigger, changedSocial, match, updateTrigger, isOpenConditions}) => {
   const updateMessageConditions = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[changedSocial][index].conditions = !messagesCopy[changedSocial][index].conditions;

      const updatedTrigger = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: match.params.botId
      };

      updateTrigger(updatedTrigger);
   };

   return (
      <div className={style.conditionsButton} style={{top: isOpenConditions && '40px'}}>
         <Tooltip title={`${isOpenConditions ? 'Удалить условие' : 'Добавить условие'}`} placement="top">
            <IconButton aria-label="delete" size="small" onClick={updateMessageConditions}>
               {isOpenConditions ? <HighlightOffIcon className={style.conditionsButtonIcon} fontSize="inherit"/> : <AddCircleOutlineIcon className={style.conditionsButtonOpenIcon} fontSize="inherit"/>}
            </IconButton>
         </Tooltip>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData) => dispatch(updateTrigger(triggerData)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ConditionsToggle);
