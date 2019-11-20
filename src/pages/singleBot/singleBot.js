import React, {useEffect, useState} from 'react';
import style from './singleBot.module.sass';
import {getAllScenariesForBot} from "../../actions/actionCreator";
import {connect} from 'react-redux';
import ScenariosContainer from '../../componens/scenariosAndTriggers/scenariosContainer/scenariosContainer';
import NavBar from '../../componens/navbar/navbar';
import MainHeader from "../../componens/mainHeader/mainHeader";


const SingleBot = (props) => {
   useEffect(() => {
      props.getScenaries(props.match.params.botId)
   }, [props.match.params.botId]);


   return (
      <div className={style.mainContainer}>
         <MainHeader
            isMainHeader={false}
         />
         <NavBar/>
         <div className={style.contentBlock}>
            <ScenariosContainer/>
         </div>
      </div>
   )
};

const mapStateToProps = state => {
   const {botScenarios, isFetching, error} = state.singleBotReducers;
   const {changedScenarioId} = state.singleBotReducers;


   return {
      botScenarios, isFetching, error, changedScenarioId
   }
};

const mapDispatchToProps = dispatch => ({
   getScenaries: (botId) => dispatch(getAllScenariesForBot(botId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleBot);
