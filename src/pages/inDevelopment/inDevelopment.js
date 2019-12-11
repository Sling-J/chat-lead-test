import React, {useEffect} from 'react';
import style from './inDevelopment.module.sass';
import {getAllScenariesForBot} from "../../actions/actionCreator";
import {connect} from 'react-redux';
import NavBar from '../../componens/navbar/navbar';
import MainHeader from "../../componens/mainHeader/mainHeader";
import smile from '../../images/dialog_smile.png';

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
            <div>
               <img src={smile} alt={'smile'}/>
               <h1>Функция скоро появится...</h1>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleBot);
