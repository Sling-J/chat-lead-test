import React, {useEffect} from 'react';
import {compose} from "redux";
import style from './autoride.module.sass';
import NavBar from '../../componens/navbar/navbar';
import {connect} from "react-redux";
import {changeScenarioId, getAllAutorides, getAllScenariesForBot} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import AutorideContainer from '../../componens/autorideContainer/autorideContainer';
import MainHeader from "../../componens/mainHeader/mainHeader";


const Autoride = (props) => {
   useEffect(() => {
      props.getAutorides(props.match.params.botId);
   }, []);

   return (
      <div className={style.mainContainer}>
         <MainHeader
            isMainHeader={false}
         />
         <NavBar/>
         <div className={style.contentBlock}>
            <AutorideContainer/>
         </div>
      </div>
   )
};


const mapStateToProps = ({autoridesReducers, singleBotReducers}) => ({
   autoridesData: autoridesReducers.autoridesData,
   isFetching: autoridesReducers.isFetching,
   error: autoridesReducers.error,
   changedScenarioId: singleBotReducers.changedScenarioId
});

const mapDispatchToProps = dispatch => ({
   getAutorides: (botId) => dispatch(getAllAutorides(botId)),
   getScenaries: (botId) => dispatch(getAllScenariesForBot(botId)),
   changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))

});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Autoride);
