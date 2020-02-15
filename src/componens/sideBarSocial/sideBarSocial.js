import React from 'react';
import style from './sideBarSocial.module.sass';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateSocialInTrigger, changeSocial} from "../../actions/actionCreator";
import faceBookMassanger from '../../images/facebook-messenger-logo-big.png';
import telegram from '../../images/telegram-icon-big.png';
import vk from '../../images/vk-logo-big.png';
import whatsApp from '../../images/whatsapp-big.png';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faCheckCircle, faCircle} from "@fortawesome/free-solid-svg-icons";

import {getFilledStatus} from "../../utils/socialFilledStatus";

const SideBarSocial = props => {
   return (
      <div className={style.mainContainer}>
         <h2>Каналы</h2>

         <p>Все каналы создаются отдельно</p>

         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField}
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
               <FontAwesomeIcon
                  className={style.inputGroupIcon}
                  color={
                     props.changedSocial === 'facebook' ? 'blue' :
                        getFilledStatus('facebook', props.changedTrigger) ? 'green' : '#e57373'
                  }
                  icon={
                     props.changedSocial === 'facebook' ? faCircle :
                        getFilledStatus('facebook', props.changedTrigger) ? faCheckCircle : faExclamationCircle
                  }
               />
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField}
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
               <FontAwesomeIcon
                  className={style.inputGroupIcon}
                  color={
                     props.changedSocial === 'telegram' ? 'blue' :
                        getFilledStatus('telegram', props.changedTrigger) ? 'green' : '#e57373'
                  }
                  icon={
                     props.changedSocial === 'telegram' ? faCircle :
                        getFilledStatus('telegram', props.changedTrigger) ? faCheckCircle : faExclamationCircle
                  }
               />
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField}
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
               <FontAwesomeIcon
                  className={style.inputGroupIcon}
                  color={
                     props.changedSocial === 'vk' ? 'blue' :
                        getFilledStatus('vk', props.changedTrigger) ? 'green' : '#e57373'
                  }
                  icon={
                     props.changedSocial === 'vk' ? faCircle :
                        getFilledStatus('vk', props.changedTrigger) ? faCheckCircle : faExclamationCircle
                  }
               />
            </label>
         </div>
         <div className={style.inputGroup}>
            <input
               className={style.inputGroupField}
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
               <FontAwesomeIcon
                  className={style.inputGroupIcon}
                  color={
                     props.changedSocial === 'whatsapp' ? 'blue' :
                        getFilledStatus('whatsapp', props.changedTrigger) ? 'green' : '#e57373'
                  }
                  icon={
                     props.changedSocial === 'whatsapp' ? faCircle :
                        getFilledStatus('whatsapp', props.changedTrigger) ? faCheckCircle : faExclamationCircle
                  }
               />
            </label>
         </div>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateSocialInTrigger: (triggerData) => dispatch(updateSocialInTrigger(triggerData)),
   changeSocial: (social) => dispatch(changeSocial(social))
});


export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(SideBarSocial);
