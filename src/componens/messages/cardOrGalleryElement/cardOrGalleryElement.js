import React, {Fragment, useState} from 'react';
import {compose} from "redux";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";

import {staticMedia} from "../../../config/service/service";
import {updateTrigger} from "../../../actions/actionCreator";
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import MiniImagesForSlider from './miniImagesForSlider/miniImagesForSlider';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";

import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";
import FilledStatusContainer from "../../Containers/FilledStatusContainer";

import style from './cardOrGallaryElement.module.sass';

const CardOrGalleryElement = (props) => {
   const {type, index, pictureForLabel, value, changedTrigger, conditionalsValue} = props;
   const [changedSlide, changeSlide] = useState(0);

   const updateTrigger = (e, typeInput) => {
      const messagesCopy = changedTrigger.messages;

      const updationData = {
         type: 'text'
      };

      if (typeInput === 'text' || typeInput === 'title') {
         Object.assign(messagesCopy[props.changedSocial][index][type][changedSlide], {
            [typeInput]: e.target.value
         });
      } else {
         Object.assign(updationData, {
            file: e.target.files[0],
            type: 'photo'
         })
      }

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         changedSlide,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      if (typeInput === 'text' || typeInput === 'title') {
         props.updateTrigger(triggerData, null, props.changedSocial);
      } else {
         props.updateTrigger(triggerData, updationData, props.changedSocial);
      }

   };

   const newSlideOrNextSlide = () => {
      const messagesCopy = changedTrigger.messages;

      if (messagesCopy[props.changedSocial][index][type].length === changedSlide + 1) {
         messagesCopy[props.changedSocial][index][type].push({photo: '', title: '', text: '', keyboard: []});
         const triggerData = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            changedSlide: changedSlide,
            botId: props.match.params.botId
         };
         props.updateTrigger(triggerData, null, props.changedSocial);
         changeSlide(changedSlide + 1);
      } else {
         changeSlide(changedSlide + 1);
      }
   };

   return (
      <div className={style.mainContainer}>
         <FilledStatusContainer status={value[0].title.length !== 0 && value[0].text.length !== 0} title="- Пожалуйста, заполните поля для текста">
            {({isHovered}) => (
               <Fragment>
                  <ConditionsToggle isOpenConditions={conditionalsValue.conditions} {...props}/>
                  <ConditionsContainer conditions={conditionalsValue.conditions} {...props}/>

                  <div className={style.hoverBar}>
                     <HoverBarForMessage
                        {...props}
                     />
                  </div>
                  <div className={`${style.contentContainer} ${conditionalsValue.conditions && style.cardRadius}`}>
                     <div className={style.controlsLeft} onClick={newSlideOrNextSlide}>+</div>
                     <div className={style.pictureContainer}>
                        <input
                           type={'file'}
                           accept={'image/*'}
                           name={index}
                           id={index}
                           onChange={updateTrigger}
                           className={style.inputFile}
                        />
                        <label htmlFor={index}>
                           <div className={style.cardPictureContainer}>
                              {
                                 value[changedSlide].photo.length > 0 ?
                                    <img src={staticMedia + value[changedSlide].photo} alt={value}/> :
                                    <h2 className={style.labelPictureContainer}>
                                       {pictureForLabel.img}
                                       <p>Картинка</p>
                                    </h2>
                              }
                              <p>{value.length === 0 && pictureForLabel.label}</p>
                           </div>
                        </label>
                     </div>
                     <div className={`${style.inputContainer} ${isHovered && style.inputContainerBorderColor}`}>
                        <input
                           type={'text'}
                           defaultValue={value[changedSlide].title}
                           placeholder={'Введите титульное слово'}
                           onBlur={(e) => updateTrigger(e, 'title')}
                        />
                        <textarea
                           defaultValue={value[changedSlide].text}
                           placeholder={'Введите текст'}
                           onBlur={(e) => updateTrigger(e, 'text')}
                        />
                     </div>
                     <MiniImagesForSlider
                        value={value}
                        changeSlide={changeSlide}
                        changedSlide={changedSlide}
                     />

                     <div
                        onClick={() => changedSlide !== 0 && changeSlide(changedSlide - 1)}
                        className={style.controlsRight}
                     >
                        -
                     </div>
                  </div>
                  <ButtonsContainer
                     {...props}
                     changedSlideOrElement={changedSlide}
                  />
               </Fragment>
            )}
         </FilledStatusContainer>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, changedSocial) => dispatch(updateTrigger(triggerData, updationData, changedSocial)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(CardOrGalleryElement);
