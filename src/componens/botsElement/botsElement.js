import React, {useState} from 'react';
import style from './botsElement.module.sass';

import edit from '../../images/buttons/edit.png'
import trash from '../../images/buttons/trash.png';
import checkmark from '../../images/buttons/checkmark.png';
import cancel from '../../images/buttons/cancel.png';

import facebookIcon from '../../images/facebook-messenger-logo-big.png'
import telegramIcon from '../../images/telegram-icon-big.png'
import vkIcon from '../../images/vk-logo-big.png'
import whatsappIcon from '../../images/whatsapp-big.png'

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteBot, editManager} from "../../actions/actionCreator";

const BotsElement = (props) => {
   const {id} = props;
   const [name, setName] = useState(false);
   const [isEdit, setEdit] = useState(0);

   const paidDay = props.payed_end_date >= 5 ? <span>Ваш пробный период заканчивается через <span className={style.paidDay}>{props.payed_end_date} дней.</span></span> :
      props.payed_end_date >= 2 ? <span>Ваш пробный период заканчивается через <span className={style.paidDay}>{props.payed_end_date} дня.</span></span> :
         props.payed_end_date === 1 ? <span>Ваш пробный период заканчивается через <span className={style.paidDay}>{props.payed_end_date} день.</span></span> :
            props.payed_end_date === 0 ? 'Пробный период закончился.' : '';

   return (
      <li className={style.mainContainer}>
         {isEdit ? (
            <div className={style.nameContainer}>
               <input name="name" type="text" placeholder="Название"
                      style={{fontSize: "27px", maxWidth: "75%", marginTop: "19px"}}/>
               <button
                  className={style.bot_edit_btn + " bot-list__edit default-btn default-btn--icon-style default-btn--outline"}
                  onClick={() => {
                     const newName = document.querySelector('.' + style.nameContainer + ' input[name=name]').value;
                     props.editManager({
                        idBot: id,
                        name: newName,
                        optional_params: ["name"]
                     });

                     setName(newName);
                     setEdit(0);
                  }}>
                  <img src={checkmark} alt="Edit" className={style.btn_edit_img}/>
                  <span className="text-tooltip text-tooltip--top">Изменить</span>
               </button>
               <button
                  className={style.bot_edit_btn + " bot-list__edit default-btn default-btn--icon-style default-btn--outline"}
                  onClick={() => {
                     setEdit(0);
                  }}>
                  <img src={cancel} alt="Edit" className={style.btn_edit_img}/>
                  <span className="text-tooltip text-tooltip--top">Отмена</span>
               </button>
            </div>
         ) : (
            <div className={style.nameContainer}>
               <h2>{name || props.name}</h2>
               <button
                  className={style.bot_edit_btn + " bot-list__edit default-btn default-btn--icon-style default-btn--outline"}
                  onClick={() => {
                     setEdit(1);
                  }}>
                  <img src={edit} alt="Edit" className={style.btn_edit_img}/>
                  <span className="text-tooltip text-tooltip--top">Редактировать</span>
               </button>
            </div>
         )}
         <div className={style.socialContainer}>
            <img src={facebookIcon} alt="Facebook"/>
            <img src={telegramIcon} alt="Telegram"/>
            <img src={vkIcon} alt="Facebook"/>
            <img src={whatsappIcon} alt="WhatsApp"/>
         </div>

         <h2>{paidDay}</h2>

         <div className={style.controls}>
            <Link to={`/bots/${id}/setup`} className={style.link}>Изменить</Link>
            <img src={trash} alt="Delete" onClick={() => props.botCallback(name || props.name, id)}/>
         </div>

      </li>
   )
};

const mapDispatchToProps = dispatch => ({
   deleteBot: (botData) => dispatch(deleteBot(botData)),
   editManager: (setupData) => dispatch(editManager(setupData)),
});

export default connect(null, mapDispatchToProps)(BotsElement);
