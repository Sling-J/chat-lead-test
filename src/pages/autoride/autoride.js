import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import AutorideContainer from '../../componens/autorideContainer/autorideContainer';
import {getAllAutorides, getAllScenariesForBot} from "../../actions/actionCreator";
import PageLoader from "../../componens/Containers/PageLoader";

import style from './autoride.module.sass';

const Autoride = ({autoridesData, getAutorides, scenariosForScenarioContainer, getScenarios, match, loadingOfAutoRides, loadingOfScenarios}) => {
   useEffect(() => {
      if (autoridesData.length === 0) {
         getAutorides(match.params.botId);
      }

      if (scenariosForScenarioContainer.length === 0) {
         getScenarios(match.params.botId);
      }
   }, [match.params.botId]);

   return (
      <div className={style.mainContainer}>
         <PageLoader loading={loadingOfAutoRides || loadingOfScenarios}>
            <AutorideContainer/>
         </PageLoader>
      </div>
   )
};


const mapStateToProps = ({autoridesReducers, singleBotReducers}) => ({
   autoridesData: autoridesReducers.autoridesData,
   loadingOfAutoRides: autoridesReducers.loadingOfAutoRides,
   loadingOfScenarios: singleBotReducers.loadingOfScenarios,
   scenariosForScenarioContainer: singleBotReducers.scenariosForScenarioContainer,
});

const mapDispatchToProps = dispatch => ({
   getAutorides: (botId) => dispatch(getAllAutorides(botId)),
   getScenarios: (botId) => dispatch(getAllScenariesForBot(botId)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Autoride);
