import React, {useState, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {Input} from "antd";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsToggle from "../conditionsForElements/conditionsToggle";
import ConditionsContainer from "../conditionsForElements/conditionsContainer";

import {updateTrigger} from "../../../actions/actionCreator";

import style from "./codeElement.module.sass";

const CodeElement = props => {
   const {value, index, componentType, changedTrigger, type, match} = props;

   const [textAreaValue, setTextAreaValue] = useState("");

   useEffect(() => {
      setTextAreaValue(value.customs);
   }, [value.customs]);

   const updateTrigger = event => {
      const messagesCopy = changedTrigger.messages;
      const customs = messagesCopy[props.changedSocial][index];

      customs.customs = event.target.value;

      const triggerData = {
         ...changedTrigger,
         index,
         type,
         messages: messagesCopy,
         botId: match.params.botId
      };

      value.customs !== textAreaValue && props.updateTrigger(triggerData, null, props.changedSocial);
   };

   return (
      <div className={style.textArea}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>

         <div className={style.codeElementContainer}>
            <p className={style.codeElementText}>Код вставки:</p>

            <div className={style.codeElement}>
               <ConditionsToggle isOpenConditions={value.conditions} {...props}/>
               <ConditionsContainer conditions={value.conditions} {...props}/>

               <Input
                  style={{width: "232px"}}
                  className={`${value.conditions && style.textRadius} ${style.codeElementInput}`}
                  id={`insertVariable-${componentType}${index}`}
                  onBlur={updateTrigger}
                  defaultValue={value.customs}
                  placeholder="Напишите обработчик"
               />
            </div>
         </div>
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
