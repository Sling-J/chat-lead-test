import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {getAllBroadCasts, getAllScenariesForBot} from "../../actions/actionCreator";
import BroadCastContainer from '../../componens/broadCastContainer/broadCastContainer';
import PageLoader from "../../componens/Containers/PageLoader";

import style from './broadcast.module.sass';

const BroadCast = ({broadCastData, scenariosForScenarioContainer, getBroadCasts, getScenarios, match, loadingOfBroadCasts, loadingOfScenarios}) => {
   useEffect(() => {
      if (broadCastData.length === 0) {
         getBroadCasts(match.params.botId);
      }

      if (scenariosForScenarioContainer.length === 0) {
         getScenarios(match.params.botId);
      }
   }, [match.params.botId]);

   return (
      <div className={style.mainContainer}>
         <PageLoader loading={loadingOfBroadCasts || loadingOfScenarios}>
            <BroadCastContainer/>
         </PageLoader>
      </div>
   )
};

const mapStateToProps = ({broadCastReducers, singleBotReducers}) => ({
   scenariosForScenarioContainer: singleBotReducers.scenariosForScenarioContainer,
   loadingOfScenarios: singleBotReducers.loadingOfScenarios,
   loadingOfBroadCasts: broadCastReducers.loadingOfBroadCasts,
   broadCastData: broadCastReducers.broadCastData
});

const mapDispatchToProps = dispatch => ({
   getBroadCasts: (botId) => dispatch(getAllBroadCasts(botId)),
   getScenarios: (botId) => dispatch(getAllScenariesForBot(botId))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BroadCast);
