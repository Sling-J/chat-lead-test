import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsForElements from "../conditionsForElements/conditionsForElements";

import style from "./codeElement.module.sass";

const CodeElement = props => {
   const {value, index, componentType, changedTrigger, type, match} = props;

   const [textAreaValue, setTextAreaValue] = useState("");
   const [errorText, setErrorText] = useState(null);

   useEffect(() => {
      setTextAreaValue(JSON.stringify(value.customs));
   }, [value.customs]);

   const updateTrigger = () => {
      const messagesCopy = changedTrigger.messages;
      const customs = messagesCopy[props.changedSocial][index];

      try {
         customs.customs = JSON.parse(textAreaValue);

         const triggerData = {
            ...changedTrigger,
            index,
            type,
            messages: messagesCopy,
            botId: match.params.botId
         };

         setErrorText(null);
         JSON.stringify(value.customs) !== textAreaValue && props.updateTrigger(triggerData, null, props.changedSocial);
      } catch (e) {
         console.log(e.message);
         setErrorText('Неверный формат кода');
      }
   };

   return (
      <div className={style.textArea}>
			<ConditionsForElements/>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         <textarea
            id={`insertVariable-${componentType}${index}`}
            onChange={e => setTextAreaValue(e.target.value)}
            onBlur={updateTrigger}
            value={textAreaValue === '""' ? "" : textAreaValue}
            placeholder="Напишите обработчик"
         />

         <p className={style.errorText}>{errorText}</p>
      </div>
   )
};

const mapStateToProps = ({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
});

const mapDispatchToProps = dispatch => ({
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(CodeElement);
