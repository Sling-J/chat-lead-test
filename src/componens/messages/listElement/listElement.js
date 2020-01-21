import React from 'react';
import style from './listElement.module.sass';
import {staticMedia} from "../../../config/service/service";
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import {connect} from 'react-redux';
import ButtonsContainer from '../buttonsContainer/buttonsContainer';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";
import ConditionsForElements from "../conditionsForElements/conditionsForElements";

const ListElements = (props) => {
   const {type, index, pictureForLabel, value, changedTrigger} = props;

   const updateTrigger = (e, typeInput, indexListElement) => {
      const messagesCopy = changedTrigger.messages;

      const updationData = {
         type: 'text'
      };
      if (typeInput === 'text' || typeInput === 'title') {
         Object.assign(messagesCopy[props.changedSocial][index][type][indexListElement], {
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
         changedSlide: indexListElement,
         messages: messagesCopy,
         botId: props.match.params.botId
      };


      if (typeInput === 'text' || typeInput === 'title') {
         props.updateTrigger(triggerData, null, props.changedSocial);
      } else {
         props.updateTrigger(triggerData, updationData, props.changedSocial);
      }

   };

   const newListElementHanlder = () => {
      const messagesCopy = changedTrigger.messages;
      messagesCopy[props.changedSocial][index][type].push({photo: '', title: '', text: '', keyboard: []});
      const triggerData = {
         ...changedTrigger,
         index: index,
         messages: messagesCopy,
         botId: props.match.params.botId
      };
      props.updateTrigger(triggerData, null, props.changedSocial);
   };

   return (
      <div className={style.mainContainer}>
			<ConditionsForElements/>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         {
            value.map((elem, indexInListArray) => (
               <div className={style.listElement} style={indexInListArray === value.length - 1 ? {border: 'none'} : {}}>
                  <div className={style.inputContainer}>
                     <input
                        type={'text'}
                        defaultValue={elem.title}
                        placeholder={'Введите титульное слово'}
                        onBlur={(e) => updateTrigger(e, 'title', indexInListArray)}
                     />
                     <textarea
                        defaultValue={elem.text}
                        placeholder={'Введите текст'}
                        onBlur={(e) => updateTrigger(e, 'text', indexInListArray)}
                     />
                     <ButtonsContainer
                        {...props}
                        changedSlideOrElement={indexInListArray}
                     />
                  </div>
                  <div className={style.pictureContainer}>
                     <input
                        type={'file'}
                        accept={'image/*'}
                        name={indexInListArray + index}
                        id={indexInListArray + index}
                        onChange={(e) => updateTrigger(e, 'file', indexInListArray)}
                        className={style.inputFile}
                     />
                     <label htmlFor={indexInListArray + index}>
                        <div className={style.pictureContainer}>
                           <h2>
                              {
                                 elem.photo.length > 0 ?
                                    <img src={staticMedia + elem.photo} alt={value}/>
                                    : pictureForLabel.img
                              }
                           </h2>
                           <p>{value.length === 0 && pictureForLabel.label}</p>
                        </div>
                     </label>
                  </div>
               </div>
            ))
         }
         <div className={style.addTagButton} onClick={newListElementHanlder}>+ Елемент списка</div>
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
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListElements));
