import React, {useState, useEffect, Fragment} from 'react';
import style from './mainHeader.module.sass';
import Logo from '../../images/logo_panel.png';
import {Link, NavLink} from 'react-router-dom';
import UserIcon from '../../images/user.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import ClickOutSide from '../hoc/clickOutside';
import chatLeadLogo from '../../images/chatlead.png';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAllBotsForUser, logout} from "../../actions/actionCreator";
import downArrow from '../../svg/db/down-button.svg';
import ContextMenuBots from './contextMenuBots/contextMenuBots';
import LinearProgress from "@material-ui/core/LinearProgress";
import {Spin} from 'antd';

const MainHeader = (props) => {
   const [isOpenMenu, setStatusToOpenMenu] = useState(false);
   const [isOpenBotContext, setStatusBotContext] = useState(false);

   const {isMainHeader, changedBotData, isServiceHeader} = props;

   useEffect(() => {
      props.getAllBots(props.match.params.botId);
   }, []);

   return (
      <Fragment>
         {(props.isFetching || props.isFetchingSetup || props.isFetchingBot || props.isFetchingBroadCast || props.isFetchingAutorides || props.isFetchingBotsReducers || props.loadingOfStatistics)
         && <LinearProgress className={style.linearProgress}/>
         }
         <header className={style.mainContainer}>
            <div className={style.leftSideContainer}>
               {isMainHeader || isServiceHeader ? (
                  <Link to={'/bots'}><img src={Logo} alt={'logo'}/></Link>
               ) : (
                  <Link to={'/bots'}>
                     <img src={chatLeadLogo} alt={'logo'} style={{width: '35px', height: '35px'}}/>
                  </Link>
               )}

               <ClickOutSide onClickedOutside={() => setStatusBotContext(false)}>
                  <>
                     {(!isMainHeader && !isServiceHeader) && (
                        <div
                           className={isOpenBotContext ? style.activeBotSelector : style.botSelector}
                           onClick={() => setStatusBotContext(true)}
                        >
                           <div className={style.nameBot}>{(changedBotData && changedBotData.name) || <Spin/>}</div>
                           <img src={downArrow} alt={'downArrow'}/>
                           <div className={style.contextBotContainer}>
                              {isOpenBotContext && (
                                 <ContextMenuBots
                                    setStatusBotContext={setStatusBotContext}
                                 />
                              )}
                           </div>
                        </div>
                     )}
                  </>
               </ClickOutSide>
            </div>
            <div className={style.servicesMenu}>
               {isServiceHeader && (
                  <ul className={style.servicesMenuContainer}>
                     <li>
                        <NavLink to="/bots/profile" activeClassName={style.servicesMenuItem}>Аккаунт</NavLink>
                     </li>
                     <li>
                        <NavLink to="/bots/tariff/payment" activeClassName={style.servicesMenuItem}>Тарифы</NavLink>
                     </li>
                     <li>
                        <NavLink to="/bots/partners" activeClassName={style.servicesMenuItem}>Партнерам</NavLink>
                     </li>
                     <li>
                        <NavLink to="/bots">Панель</NavLink>
                     </li>
                  </ul>
               )}
               <ClickOutSide onClickedOutside={() => setStatusToOpenMenu(false)}>
                  <div className={style.menuContainer} onClick={() => setStatusToOpenMenu(true)}>
                     <img src={UserIcon} alt={'userIcon'}/>
                     <FontAwesomeIcon icon={isOpenMenu ? faAngleUp : faAngleDown}/>
                     {isOpenMenu && (
                        <ul className={style.contextMenuContainer}>
                           <li>
                              <Link to="/">Аккаунт</Link>
                           </li>
                           <li>
                              <Link to="/bots/tariff/payment">Тарифы</Link>
                           </li>
                           <li>
                              <Link to="/">Партнерам</Link>
                           </li>
                           <li>
                              <Link to="/bots">Панель</Link>
                           </li>
                           <li onClick={() => props.logout(props.history)}>Выйти</li>
                        </ul>
                     )}
                  </div>
               </ClickOutSide>
            </div>
         </header>
      </Fragment>
   )
};


const mapStateToProps = state => {
   const {botsData, changedBotData, isFetching, error} = state.botsReducers;
   
   
   const isFetchingSetup = state.botSetupReducers.isFetching;
   const isFetchingBot = state.singleBotReducers.isFetching;
   const isFetchingBroadCast = state.broadCastReducers.isFetching;
   const isFetchingAutorides = state.autoridesReducers.isFetching;
   const isFetchingBotsReducers = state.botsReducers.isFetching;
   const loadingOfStatistics = state.botStatisticsReducer.loadingOfStatistics;

   return {
      botsData, isFetching, error,
      changedBotData, isFetchingSetup,
      isFetchingBot, isFetchingBroadCast,
      isFetchingAutorides, isFetchingBotsReducers,
      loadingOfStatistics
   }
};

const mapDispatchToProps = dispatch => ({
   getAllBots: (botId) => dispatch(getAllBotsForUser(botId)),
   logout: (history) => dispatch(logout(history))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));
