import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import onClickOutside from "react-onclickoutside";

import {getManager, getAllScenariesForBot, getAllBotsForUser} from "../../../actions/actionCreator";

import style from './contextMenuBots.module.sass';

const ContextMenuBots = (props) => {
   const {setStatusBotContext} = props;
   ContextMenuBots.handleClickOutside = () => setStatusBotContext(false);

   return (
      <div className={style.contextBotMenu}>
         {props.botsData.map(elem => (
            <Link to={`/bots/${elem.id}/setup`} className={style.link} onClick={() => {
               props.getManager(elem.id);
               props.getAllScenarioForBot(elem.id);
               props.getAllBotsForUser(elem.id);
            }}>
               {elem.name}
            </Link>
         ))}
         <Link to={'/bots'} className={style.link}>Создать нового бота</Link>
      </div>
   )
};

const clickOutsideConfig = {
   handleClickOutside: () => ContextMenuBots.handleClickOutside
};

const mapStateToProps = ({botsReducers}) => ({
   error: botsReducers.error,
   botsData: botsReducers. botsData,
   isFetching: botsReducers.isFetching,
   changedBotData: botsReducers.changedBotData,
});

const mapDispatchToProps = dispatch => ({
   getManager: idBot => dispatch(getManager(idBot)),
   getAllScenarioForBot: idBot => dispatch(getAllScenariesForBot(idBot)),
   getAllBotsForUser: idBot => dispatch(getAllBotsForUser(idBot)),
});

export default onClickOutside(connect(mapStateToProps, mapDispatchToProps)(ContextMenuBots), clickOutsideConfig);
