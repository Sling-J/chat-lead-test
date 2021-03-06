import React, {useState, useEffect, Fragment} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {updateTrigger} from "../../../actions/actionCreator";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";
import FilledStatusContainer from "../../Containers/FilledStatusContainer";

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
         setErrorText('Неверный формат кода');
      }
   };

   return (
      <div className={style.textArea}>
         <FilledStatusContainer title="- Пожалуйста, введие код в поле" status={Object.keys(value.customs).length !== 0}>
            {({isHovered}) => (
               <Fragment>
                  <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
                  <ConditionsContainer conditions={value.conditions} {...props}/>

                  <div className={style.hoverBar}>
                     <HoverBarForMessage
                        {...props}
                     />
                  </div>
                  <textarea
                     className={`${value.conditions && style.textRadius} ${isHovered && style.codeBorderColor}`}
                     id={`insertVariable-${componentType}${index}`}
                     onChange={e => setTextAreaValue(e.target.value)}
                     onBlur={updateTrigger}
                     value={textAreaValue === '""' ? "" : textAreaValue}
                     placeholder="Напишите обработчик"
                  />

                  <p className={style.errorText}>{errorText}</p>
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
   updateTrigger: (triggerData, updationData, social) => dispatch(updateTrigger(triggerData, updationData, social)),
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(CodeElement);
