import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import ScenariosContainer from '../../componens/scenariosAndTriggers/scenariosContainer/scenariosContainer';
import PageLoader from "../../componens/Containers/PageLoader";

import {getAllScenariesForBot} from "../../actions/actionCreator";

import style from './singleBot.module.sass';

const SingleBot = ({scenariosForScenarioContainer, getScenarios, match, loadingOfScenarios}) => {
   useEffect(() => {
      if (scenariosForScenarioContainer.length === 0) {
         getScenarios(match.params.botId);
      }
   }, [match.params.botId]);

   return (
      <div className={style.mainContainer}>
         <PageLoader loading={loadingOfScenarios}>
            <ScenariosContainer/>
         </PageLoader>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   scenariosForScenarioContainer: singleBotReducers.scenariosForScenarioContainer,
   loadingOfScenarios: singleBotReducers.loadingOfScenarios,
});

const mapDispatchToProps = dispatch => ({
   getScenarios: botId => dispatch(getAllScenariesForBot(botId))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(SingleBot);
