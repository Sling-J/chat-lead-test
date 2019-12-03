import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import BroadCastContainer from '../../componens/broadCastContainer/broadCastContainer';
import MainHeader from '../../componens/mainHeader/mainHeader';
import NavBar from '../../componens/navbar/navbar';

import {changeScenarioId, getAllBroadCasts} from "../../actions/actionCreator";
import style from './broadcast.module.sass';

const BroadCast = (props) => {
   useEffect(() => {
      props.getBroadCasts(props.match.params.botId);
   }, []);

   return (
      <div className={style.mainContainer}>
         <MainHeader
            isMainHeader={false}
         />
         <NavBar/>
         <div className={style.contentBlock}>
            <BroadCastContainer/>
         </div>
      </div>
   )
};

const mapStateToProps = state => {
   const {broadCastData, isFetching, error} = state.broadCastReducers;
   const {changedScenarioId} = state.singleBotReducers;


   return {
      broadCastData, isFetching, error, changedScenarioId
   }
};

const mapDispatchToProps = dispatch => ({
   getBroadCasts: (botId) => dispatch(getAllBroadCasts(botId)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BroadCast));
