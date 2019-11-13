import React, {useEffect} from 'react';
import style from './singleScenario.module.sass';
import Header from "../../componens/header/header";
import {connect} from 'react-redux';
import {getAllScenariesForBot} from "../../actions/actionCreator";

const SingleScenario = (props) => {

    // const triggers = props.botScenarios.filter(elem => elem.id === props.match.params.scenarioId);


    console.log(props.botScenarios);

    return (
        <div className={style.mainContainer}>
            <Header/>
            <div className={style.contentBlock}>
                {/*<ScenariosContainer/>*/}
                {/*<div className={style.scenaries}>*/}
                {/*<h1>Scenarios:</h1>*/}
                {/*{*/}
                {/*props.botScenarios.map(elem => {*/}
                {/*/!*<div>*!/*/}
                {/*/!*{elem}*!/*/}
                {/*/!*</div>  *!/*/}
                {/*})*/}
                {/*}*/}
                {/*</div>*/}
            </div>
        </div>
    )
};



const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;

    return {
        botScenarios, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getScenaries: (botId) => dispatch(getAllScenariesForBot(botId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleScenario);