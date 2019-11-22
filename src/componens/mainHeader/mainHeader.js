import React, {useState, useEffect} from 'react';
import style from './mainHeader.module.sass';
import Logo from '../../images/logo_panel.png';
import {Link} from 'react-router-dom';
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

const MainHeader = (props) => {
   const [isOpenMenu, setStatusToOpenMenu] = useState(false);
   const {isMainHeader} = props;
   const {changedBotData} = props;
   const [isOpenBotContext, setStatusBotContext] = useState(false);

   useEffect(() => {
      props.getAllBots(props.match.params.botId);
   }, []);


   return (
      <header className={style.mainContainer}>
         {(props.isFetching || props.isFetchingSetup) && <LinearProgress className={style.linearProgress}/>}
         <div className={style.leftSideContainer}>
            {
               isMainHeader ? (
                  <Link to={'/bots'}><img src={Logo} alt={'logo'}/></Link>
               ) : (
                  <Link to={'/bots'}>
                     <img src={chatLeadLogo} alt={'logo'} style={{width: '35px', height: '35px'}}/>
                  </Link>
               )
            }

            <ClickOutSide onClickedOutside={() => setStatusBotContext(false)}>
               <>
                  {
                     !isMainHeader && (
                        <div
                           className={isOpenBotContext ? style.activeBotSelector : style.botSelector}
                           onClick={() => setStatusBotContext(true)}
                        >
                           <div className={style.nameBot}>{changedBotData && changedBotData.name}</div>
                           <img src={downArrow} alt={'downArrow'}/>
                           <div className={style.contextBotContainer}>
                              {
                                 isOpenBotContext && (
                                    <ContextMenuBots
                                       setStatusBotContext={setStatusBotContext}
                                    />
                                 )
                              }
                           </div>
                        </div>
                     )
                  }
               </>
            </ClickOutSide>

         </div>
         <ClickOutSide onClickedOutside={() => setStatusToOpenMenu(false)}>
            <div className={style.menuContainer} onClick={() => setStatusToOpenMenu(true)}>
               <img src={UserIcon} alt={'userIcon'}/>
               <FontAwesomeIcon icon={isOpenMenu ? faAngleUp : faAngleDown}/>
               {
                  isOpenMenu && (
                     <ul className={style.contextMenuContainer}>
                        <li>Аккаунт</li>
                        <li>Тарифы</li>
                        <li>Партнерам</li>
                        <li>Панель</li>
                        <li onClick={() => props.logout(props.history)}>Выйти</li>
                     </ul>
                  )
               }
            </div>
         </ClickOutSide>
      </header>
   )
};


const mapStateToProps = state => {
   const {botsData, changedBotData, isFetching, error} = state.botsReducers;
   const isFetchingSetup = state.botSetupReducers.isFetching;

   return {
      botsData, isFetching, error, changedBotData, isFetchingSetup
   }
};

const mapDispatchToProps = dispatch => ({
   getAllBots: (botId) => dispatch(getAllBotsForUser(botId)),
   logout: (history) => dispatch(logout(history))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));
