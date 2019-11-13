import React from 'react';
import style from './contextMenuBots.module.sass';
import {Link} from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";


const ContextMenuBots = (props) => {
    const {setStatusBotContext} = props;

    ContextMenuBots.handleClickOutside = () => setStatusBotContext(false);


    return (
        <div className={style.contextBotMenu}>
            {
                props.botsData.map(elem => (
                    <Link to={`/bots/${elem.id}/setup`} className={style.link}>
                        {elem.name}
                    </Link>
                ))
            }
            <Link to={'/bots'} className={style.link}>Создать нового бота</Link>
        </div>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => ContextMenuBots.handleClickOutside
};

const mapStateToProps = state => {
    const {botsData, changedBotData, isFetching, error} = state.botsReducers;

    return {
        botsData, isFetching, error, changedBotData
    }
};

export default onClickOutside(connect(mapStateToProps)(ContextMenuBots), clickOutsideConfig);