import React from 'react';
import style from './formElement.module.sass';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";
import ButtonsContainer from '../../messages/buttonsContainer/buttonsContainer';
import HoverBarForMessage from "../hoverBarForMessage/hoverBarForMessage";

const FormElement = (props) => {
   const {type, index, value, changedTrigger} = props;

   const updateTrigger = (e, inputIndex) => {
      const messagesCopy = changedTrigger.messages;

      const forms = messagesCopy[props.changedSocial][index].form;

      if (forms[0] === "") {
         forms[0] = {type: "", caption: ""}
      }

      const typeOfField = forms[inputIndex].type.length !== 0
         ? forms[inputIndex].type
         : "text";

      forms[inputIndex] = {
         type: typeOfField,
         caption: e.target.value
      };

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(triggerData, null, props.changedSocial);
   };

   const updateTypeTrigger = (e, inputIndex) => {
      let type = e.target.value;

      const messagesCopy = changedTrigger.messages;
      const forms = messagesCopy[props.changedSocial][index].form;

      if (forms[0] === "") {
         forms[0] = {type: "", caption: ""}
      }

      const captionOfField = (forms[inputIndex].caption.length !== 0 || forms[inputIndex].type !== undefined)
         ? forms[inputIndex].caption
         : "";

      forms[inputIndex] = {
         type: type,
         caption: captionOfField
      };

      console.log(type);

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(triggerData, null, props.changedSocial);
   };


   const newInput = () => {
      const messagesCopy = changedTrigger.messages;

      messagesCopy[props.changedSocial][index].form.push({
         type: "", caption: ""
      });

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: props.match.params.botId
      };

      props.updateTrigger(triggerData, null, props.changedSocial);
   };


   return props.soon ? (
      <div className={style.mainContainer + ' ' + style.soon}>
         <h1>Скоро!</h1>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
      </div>
   ) : (
      <div className={style.mainContainer}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         {Object.values(value)[0].map((elem, inputIndex) => (
            <div className={style.textareaFlex}>
               <textarea
                  defaultValue={elem.caption}
                  onBlur={(e) => updateTrigger(e, inputIndex)}
                  placeholder={"Введите вопрос"}
               />
               <select value={elem.type} onChange={(e) => {
                  updateTypeTrigger(e, inputIndex)
               }}>
                  <option value="text">Текст</option>
                  <option value="phone">Телефон</option>
                  <option value="email">Email</option>
                  <option value="digits">Цифры</option>
               </select>
            </div>
         ))}
         <div className={style.addInputButton} onClick={newInput}>+ Поле ввода</div>
         <ButtonsContainer {...props}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormElement));
