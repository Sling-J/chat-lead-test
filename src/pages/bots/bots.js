import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import BotsElement from '../../componens/botsElement/botsElement';

import {deleteBot, getAllBotsForUser} from "../../actions/actionCreator";

import Attention from '../../images/attention.png';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import style from '../bots/bots.module.sass';

const Bots = ({botsData, deleteBot, getAllBots}) => {
   const [BotObj, setBotObj] = useState({name: null, id: null});
	
	useEffect(() => {
      getAllBots();
   }, []);

   const handleClickOpen = (name, id) => {
      setBotObj({name, id});
   };

   const handleClose = () => {
      setBotObj({name: null, id: null})
   };

   return (
      <div className={style.mainContainer}>
         <main className={style.botsMainContainer}>
            <CreateBotForm/>

            <ul className={style.bots}>
               {botsData && botsData.map(elem => (
                  <BotsElement
                     {...elem}
                     botCallback={handleClickOpen}
                  />
               ))}
            </ul>
         </main>
         <Dialog open={BotObj.name !== null} onClose={handleClose} className="bot-deletion-popup-container">
            <div className={style.botDeletionPopup}>
               <div className={style.botDeletionPopupIcon}>
                  <img src={Attention} alt="Attention"/>
               </div>

               <h2 className={style.botDeletionPopupTitle}>
                  Подтвердите действие
               </h2>

               <p className={style.botDeletionPopupDesc}>
                  Вы уверены, что хотите удалить <span>{BotObj.name}</span>?
               </p>

               <div className={style.botDeletionPopupAction}>
                  <Button
                     className={style.botDeletionPopupActionDeleteBtn}
                     onClick={() => {
                        deleteBot({manager_id: BotObj.id});
                        handleClose();
                     }}
                     variant="outlined"
                  >
                     Удалить
                  </Button>

                  <Button
                     className={style.botDeletionPopupActionCancelBtn}
                     onClick={handleClose}
                     variant="contained"
                  >
                     Отмена
                  </Button>
               </div>
            </div>
         </Dialog>
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
