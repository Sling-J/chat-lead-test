import React, {useEffect} from 'react';
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


const mapStateToProps = state => {
    const {autoridesData, isFetching, error} = state.autoridesReducers;
    const {changedScenarioId} = state.singleBotReducers;


    return {
        autoridesData, isFetching, error, changedScenarioId
    }
};

const mapDispatchToProps = dispatch => ({
    getAutorides: (botId) => dispatch(getAllAutorides(botId)),
    getScenaries: (botId) => dispatch(getAllScenariesForBot(botId)),
    changeScenarioId: (scenarioId) => dispatch(changeScenarioId(scenarioId))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Autoride));