import React, {useEffect, useState} from 'react';
import style from '../bots/bots.module.sass';
import MainHeader from '../../componens/mainHeader/mainHeader';
import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import {connect} from 'react-redux';
import {getAllBotsForUser} from "../../actions/actionCreator";
import BotsElement from '../../componens/botsElement/botsElement';
import Attention from '../../images/attention.png';
import {deleteBot} from "../../actions/actionCreator";


const Bots = (props) => {
   const {botsData} = props;
   const [BotObj, setBotObj] = useState({name: null, id: null});

   const changeBotName = (name, id) => {
      setBotObj({"name": name, "id": id});
   }

   useEffect(() => {
      props.getAllBots();
   }, [props.userData]);


   return (
      <div className={style.mainContainer}>
         <MainHeader
            isMainHeader={true}
         />
         <main className={style.botsMainContainer}>
            <CreateBotForm/>

            <ul className={style.bots}>
               {
                  botsData && botsData.map(elem => (
                     <BotsElement
                        {...elem}
                        botCallback={changeBotName}
                     />
                  ))
               }
            </ul>
         </main>
         {
            BotObj.name !== null ? (
               <div className={style.bot_remove_modal + " " + style.show_modal}>
                  <div className={style.bot_remove}>
                     <img src={Attention} alt="Attention"/>
                     <h3>Подтвердите действие</h3>
                     <p>Вы уверены, что хотите удалить "{BotObj.name}"?</p>
                     <div className={style.bot_remove__buttons}>
                        <button className={style.blueBtn + " " + style.remove} onClick={
                           () => {
                              props.deleteBot({manager_id: BotObj.id});
                              setBotObj({name: null, id: null});
                           }
                        }>Удалить
                        </button>
                        <button className={style.blueBtn + " " + style.cansel}
                                onClick={() => setBotObj({name: null, id: null})}>Отмена
                        </button>
                     </div>
                  </div>
               </div>
            ) : (<div/>)
         }

      </div>
   )
};

const mapStateToProps = state => {
   const {botsData, isFetching, error} = state.botsReducers;

   return {
      botsData, isFetching, error
   }
};

const mapDispatchToProps = dispatch => ({
   getAllBots: () => dispatch(getAllBotsForUser()),
   deleteBot: (botData) => dispatch(deleteBot(botData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Bots);
