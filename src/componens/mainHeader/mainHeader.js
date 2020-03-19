import React, {useState, useEffect, Fragment} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {Link, NavLink, withRouter} from 'react-router-dom';

import downArrow from '../../svg/db/down-button.svg';
import chatLeadLogo from '../../images/chatlead.png';
import Logo from '../../images/logo_panel.png';
import UserIcon from '../../images/user.png';

import {Spin, Dropdown} from 'antd';
import ClickOutSide from '../hoc/clickOutside';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

import ContextMenuBots from './contextMenuBots/contextMenuBots';
import {moduleName as statisticsModule} from "../../ducks/Statistics";
import {moduleName as paymentModule} from "../../ducks/Payment";
import {moduleName as profileModule} from "../../ducks/Profile";
import {moduleName as tagsModule} from "../../ducks/Tags";
import {getAllBotsForUser} from "../../actions/actionCreator";
import {logout} from "../../ducks/Auth";

import history from "../../config/history/history";

import style from './mainHeader.module.sass';

const MainHeader = props => {
	const {changedBotData, botId, botSetupData} = props;

	const isAuthPage = history.location.pathname === '/auth'|| history.location.pathname === '/signUp';
   const isMainHeader = history.location.pathname === '/bots';
   const isServiceHeader = history.location.pathname === '/bots/tariff/payment'
		|| history.location.pathname === '/bots/tariff/payment/success'
		|| history.location.pathname === '/bots/tariff/payment/failure'
		|| history.location.pathname === '/bots/tariff/prices'
      || history.location.pathname === '/bots/tariff/history'
      || history.location.pathname === '/bots/profile'
      || history.location.pathname === '/bots/partners/mine'
      || history.location.pathname === '/bots/partners/top-partners';

   const [isOpenMenu, setStatusToOpenMenu] = useState(false);
   const [isOpenBotContext, setStatusBotContext] = useState(false);

   useEffect(() => {
      props.getAllBots(botId);
   }, []);

   const menu = (
      <ul className={style.contextMenuContainer}>
         <li>
            <Link to="/bots/profile">Аккаунт</Link>
         </li>
         <li>
            <Link to="/bots/tariff/payment">Тарифы</Link>
         </li>
         <li>
            <Link to="/bots/partners/mine">Партнерам</Link>
         </li>
         <li>
            <Link to="/bots">Панель</Link>
         </li>
         <li onClick={() => props.logout()}>
            Выйти
         </li>
      </ul>
   );

   return isAuthPage ? null : (
      <Fragment>
         {(
            props.errorOfSetup ||
            props.errorOfBot ||
            props.errorOfBroadCast ||
            props.errorOfAutoRides ||
            props.errorOfBotsReducers ||
            props.errorOfStatistics ||
            props.error
         ) &&
            <div className={style.techWorkError}>
               <p>Проводим технические работы!</p>
            </div>
         }
         {/*{(*/}
         {/*   props.isFetching ||*/}
         {/*   props.isFetchingSetup ||*/}
         {/*   props.isFetchingBot ||*/}
         {/*   props.isFetchingBroadCast ||*/}
         {/*   props.isFetchingAutoRides ||*/}
         {/*   props.isFetchingBotsReducers ||*/}
         {/*   props.loadingOfStatistics ||*/}
         {/*   props.errorOfMLP ||*/}
         {/*   props.errorOfPayment ||*/}
         {/*   props.errorOfOfTransactions ||*/}
         {/*   props.errorOfProfile ||*/}
         {/*   props.errorOfTags*/}
         {/*)*/}
         {/*&& <LinearProgress className={style.linearProgress}/>*/}
         {/*}*/}
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
                           <div className={style.nameBot}>
                              {((changedBotData && changedBotData.name) ||
                                 (Object.keys(botSetupData).length !== 0 && botSetupData.name))
                              || <Spin/>
                              }
                           </div>
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
                        <NavLink to="/bots/partners/mine" activeClassName={style.servicesMenuItem}>Партнерам</NavLink>
                     </li>
                     <li>
                        <NavLink to="/bots">Панель</NavLink>
                     </li>
                  </ul>
               )}
               <Dropdown overlay={menu} trigger={['click']} onVisibleChange={visible => setStatusToOpenMenu(visible)}>
                  <div className={style.contextMenu}>
                     <div>
                        <img src={UserIcon} alt={'userIcon'}/>
                     </div>
                     <div className={isOpenMenu ? style.contextMenuIcon : style.contextMenuIconDeg}>
                        <FontAwesomeIcon icon={faAngleDown}/>
                     </div>
                  </div>
               </Dropdown>
            </div>
         </header>
      </Fragment>
   )
};

const mapStateToProps = state => {
   const {changedBotData, isFetching, error} = state.botsReducers;

   const botSetupData = state.botSetupReducers.botSetupData;

   // const isFetchingSetup = state.botSetupReducers.isFetching;
   // const isFetchingBot = state.singleBotReducers.isFetching;
   // const isFetchingBroadCast = state.broadCastReducers.isFetching;
   // const isFetchingAutoRides = state.autoridesReducers.isFetching;
   // const isFetchingBotsReducers = state.botsReducers.isFetching;
   // const loadingOfStatistics = state[growthToolModule].loadingOfStatistics;

   const errorOfMLP = state[statisticsModule].errorOfMLP;
   const errorOfPayment = state[paymentModule].errorOfPayment;
   const errorOfOfTransactions = state[paymentModule].errorOfOfTransactions;
   const errorOfProfile = state[profileModule].errorOfProfile;
   const errorOfTags = state[tagsModule].errorOfTags;
   const errorOfSetup = state.botSetupReducers.error;
   const errorOfBot = state.singleBotReducers.error;
   const errorOfBroadCast = state.broadCastReducers.error;
   const errorOfAutoRides = state.autoridesReducers.error;
   const errorOfBotsReducers = state.botsReducers.error;
   const errorOfStatistics = state[statisticsModule].error;

   return {
      botSetupData, isFetching, error, changedBotData,
      errorOfSetup, errorOfBot, errorOfMLP,
      errorOfBroadCast, errorOfAutoRides,
      errorOfBotsReducers, errorOfStatistics,
      errorOfPayment, errorOfOfTransactions,
      errorOfProfile, errorOfTags,
      // isFetchingSetup, isFetchingBot, isFetchingBroadCast,
      // isFetchingAutoRides, isFetchingBotsReducers,
      // loadingOfStatistics,
   }
};

const mapDispatchToProps = dispatch => ({
   getAllBots: botId => dispatch(getAllBotsForUser(botId)),
   logout: () => dispatch(logout())
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(MainHeader);
