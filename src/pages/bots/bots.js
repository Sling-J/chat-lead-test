import React, {useState} from 'react';
import {connect} from 'react-redux';

import Attention from '../../images/attention.png';

import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import BotsElement from '../../componens/botsElement/botsElement';

import {deleteBot, getAllBotsForUser} from "../../actions/actionCreator";

import style from '../bots/bots.module.sass';

const Bots = ({botsData, deleteBot}) => {
   const [BotObj, setBotObj] = useState({name: null, id: null});

   const changeBotName = (name, id) => {
      setBotObj({"name": name, "id": id});
   };

   return (
      <div className={style.mainContainer}>
         <main className={style.botsMainContainer}>
            <CreateBotForm/>

            <ul className={style.bots}>
               {botsData && botsData.map(elem => (
                  <BotsElement
                     {...elem}
                     botCallback={changeBotName}
                  />
               ))}
            </ul>
         </main>
         {BotObj.name !== null ? (
            <div className={style.bot_remove_modal + " " + style.show_modal}>
               <div className={style.bot_remove}>
                  <img src={Attention} alt="Attention"/>
                  <h3>Подтвердите действие</h3>
                  <p>Вы уверены, что хотите удалить "{BotObj.name}"?</p>

                  <div className={style.bot_remove__buttons}>
                     <button
                        className={style.blueBtn + " " + style.remove}
                        onClick={() => {
                           deleteBot({manager_id: BotObj.id});
                           setBotObj({name: null, id: null});
                        }}
                     >
                        Удалить
                     </button>
                     <button
                        className={style.blueBtn + " " + style.cansel}
                        onClick={() => setBotObj({name: null, id: null})}
                     >
                        Отмена
                     </button>
                  </div>
               </div>
            </div>
         ) : (<div/>)}
      </div>
   )
};

const mapStateToProps = ({botsReducers}) => ({
   botsData: botsReducers.botsData,
});

const mapDispatchToProps = dispatch => ({
   deleteBot: botData => dispatch(deleteBot(botData)),
   getAllBots: () => dispatch(getAllBotsForUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bots);
