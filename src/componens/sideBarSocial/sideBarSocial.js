import React from 'react';
import style from './sideBarSocial.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateSocialInTrigger, changeSocial} from "../../actions/actionCreator";
import faceBookMassanger from '../../images/facebook-messenger-logo-big.png';
import telegram from '../../images/telegram-icon-big.png';
import vk from '../../images/vk-logo-big.png';
import whatsApp from '../../images/whatsapp-big.png';


const SideBarSocial = props => {
   // const updateSocialInTriggerHandler = (e) => {
   //     const updatedTrigger = {
   //         ...changedTrigger,
   //         social: e.target.value,
   //         botId: props.match.params.botId
   //     };
   //     props.updateSocialInTrigger(updatedTrigger);
   //
   // };

   const getFilledStatus = social => {
      const checkedSocial = (social === 'facebook') ? props.changedTrigger.messages.facebook :
         (social === 'telegram') ? props.changedTrigger.messages.telegram :
            (social === 'vk') ? props.changedTrigger.messages.vk :
               (social === 'whatsapp') ? props.changedTrigger.messages.whatsapp : false;

      let status = false;

      checkedSocial.forEach(item => {
         status = !!((item.text && item.text.length !== 0) ||
            (item.photo && item.photo.length !== 0) ||
            (item.audio && item.audio.length !== 0) ||
            (item.video && item.video.length !== 0) ||
            (item.file && item.file.length !== 0) ||
            (item.type_processing && item.type_processing.length !== 0) ||
            (item.card && item.card.length !== 0) ||
            (item.gallery && item.gallery.length !== 0) ||
            (item.list && item.list.length !== 0) ||
            (item.timer && item.timer.length !== 0) ||
            (item.form && item.form.length !== 0) ||
            (item.location && item.location.length !== 0) ||
            (item.payment && item.payment.length !== 0) ||
            (item.contact && item.contact.length !== 0));
      });

      return status;
   };


   return (
      <div className={style.mainContainer}>
         <h2>Каналы</h2>

         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField + ' ' + getFilledStatus('facebook') ? style.inputGroupFieldFilled : style.inputGroupFieldUnfilled }
               type="radio"
               id="Facebook Messenger"
               name="social"
               value="facebook"
               checked={props.changedSocial === 'facebook'}
               onChange={() => props.changeSocial('facebook')}
            />
            <label htmlFor={'Facebook Messenger'}>
               <img src={faceBookMassanger} alt={'facebook'}/>
               Facebook Messenger
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField + ' ' + getFilledStatus('telegram') ? style.inputGroupFieldFilled : style.inputGroupFieldUnfilled }
               type="radio"
               id="Telegram"
               name="social"
               value='telegram'
               checked={props.changedSocial === 'telegram'}
               onChange={() => props.changeSocial('telegram')}
            />
            <label htmlFor={'Telegram'}>
               <img src={telegram} alt={'telegram'}/>
               Telegram
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField + ' ' + getFilledStatus('vk') ? style.inputGroupFieldFilled : style.inputGroupFieldUnfilled }
               type="radio"
               id="vk"
               name={'social'}
               value={'vk'}
               checked={props.changedSocial === 'vk'}
               onChange={() => props.changeSocial('vk')}
            />
            <label htmlFor={'vk'}>
               <img src={vk} alt={'vk'}/>
               ВКонтакте
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField + ' ' + getFilledStatus('whatsapp') ? style.inputGroupFieldFilled : style.inputGroupFieldUnfilled }
               type="radio"
               id="WhatsApp"
               name={'social'}
               value={'whatsapp'}
               onChange={() => props.changeSocial('whatsapp')}
               checked={props.changedSocial === 'whatsapp'}
            />
            <label htmlFor={'WhatsApp'}>
               <img src={whatsApp} alt={'whatsApp'}/>
               WhatsApp
            </label>
         </div>
      </div>
   )
};

const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

const mapDispatchToProps = dispatch => ({
   updateSocialInTrigger: (triggerData) => dispatch(updateSocialInTrigger(triggerData)),
   changeSocial: (social) => dispatch(changeSocial(social))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBarSocial));
