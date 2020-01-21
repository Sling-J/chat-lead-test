import React, {useEffect} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {ScenarioIdContext} from "../../utils/Contexts";
import PageLoader from "../../componens/Containers/PageLoader";

import SetupContainer from "../../componens/setupContainer/setupContainer"
import TriggersContainer from "../../componens/scenariosAndTriggers/triggersContainer/triggersContainer";

import {changeScenarioId, getAllScenariesForBot, getManager} from "../../actions/actionCreator";

import style from './botSetup.module.sass';

const BotSetup = ({changeScenarioId, changedScenarioId, match, getManager, getScenarios, botSetupData, scenariosForScenarioContainer, loadingOfScenarios, loadingOfManager}) => {
   useEffect(() => {
      if (Object.keys(botSetupData).length === 0) {
         getManager(match.params.botId);
      }

      if (scenariosForScenarioContainer.length === 0) {
         getScenarios(match.params.botId);
      }
   }, [match.params.botId]);

   const contentContainer = () => {
      if (changedScenarioId) {
         return (
            <div className={style.triggersContainer}>
               <ScenarioIdContext.Provider value={changedScenarioId}>
                  <ScenarioIdContext.Consumer>
                     {scenarioId => (
                        <TriggersContainer
                           changedScenarioId={changedScenarioId}
                           scenarioId={scenarioId}
                           changeScenarioId={changeScenarioId}
                        />
                     )}
                  </ScenarioIdContext.Consumer>
               </ScenarioIdContext.Provider>
            </div>
         )
      }

      return (
         <main id="main">
            <PageLoader loading={loadingOfScenarios || loadingOfManager}>
               <SetupContainer/>
            </PageLoader>
         </main>
      )
   };

   return (
      <div className="main_layout main-setup-container">
         {contentContainer()}
      </div>
   )
};

const mapStateToProps = ({botSetupReducers, singleBotReducers}) => ({
   scenariosForScenarioContainer: singleBotReducers.scenariosForScenarioContainer,
   loadingOfScenarios: singleBotReducers.loadingOfScenarios,
   changedScenarioId: singleBotReducers.changedScenarioId,
   loadingOfManager: botSetupReducers.loadingOfManager,
   botSetupData: botSetupReducers.botSetupData,
});

const mapDispatchToProps = dispatch => ({
   getManager: (botId) => dispatch(getManager(botId)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId)),
   getScenarios: (botId) => dispatch(getAllScenariesForBot(botId))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BotSetup);
