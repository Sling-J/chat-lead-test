import React from 'react';
import style from './sideBarSocial.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateSocialInTrigger, changeSocial} from "../../actions/actionCreator";
import faceBookMassanger from '../../images/facebook-messenger-logo-big.png';
import telegram from '../../images/telegram-icon-big.png';
import vk from '../../images/vk-logo-big.png';
import whatsApp from '../../images/whatsapp-big.png';


const SideBarSocial = (props) => {
   // const updateSocialInTriggerHandler = (e) => {
   //     const updatedTrigger = {
   //         ...changedTrigger,
   //         social: e.target.value,
   //         botId: props.match.params.botId
   //     };
   //     props.updateSocialInTrigger(updatedTrigger);
   //
   // };


   return (
      <div className={style.mainContainer}>
         <h2>Каналы</h2>

         <div className={style.inputGroup}>
            <input
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
