import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";

import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ConditionsForElements from '../conditionsForElements/conditionsForElements';
import EmojiPicker from "../textArea/emojiPicker/emojiPicker";
import {Dropdown} from 'antd';

import style from "./codeElement.module.sass";

const CodeElement = props => {
   const {value, handler, index, componentType} = props;
   
   const [textAreaValue, setTextAreaValue] = useState('');

   useEffect(() => {
      setTextAreaValue(value.text);
   }, [value.text]);

   const menu = (
      <div className={style.variableMenu}>
         <h3>Макросы</h3>
         <ul>
            <li onClick={() => addFullName('first_name')}>Имя</li>
            {props.changedSocial === 'whatsapp' ? (
               <li onClick={() => addFullName('phone')}>Телефон</li>
            ) : (
               <li onClick={() => addFullName('last_name')}>Фамилия</li>
            )}
         </ul>
      </div>
   );

   const addFullName = name => {
      let myValue;

      if (props.changedSocial === 'whatsapp') {
         myValue = name === 'first_name'
            ? " {name}"
            : " {phone}";
      } else {
         myValue = name === 'first_name'
            ? " {first_name}"
            : " {last_name}";
      }

      setTextAreaValue(textAreaValue + myValue);
      handler({target: {value: textAreaValue + myValue}}, index, componentType);
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
            onBlur={() => handler({target: {value: textAreaValue}}, index, componentType)}
            value={textAreaValue}
            placeholder="Напишите обработчик"
         />
         <div className={style.actionNav}>
            <div className={style.actionButtons}>
               <EmojiPicker
                  className={style.actionNavSmile}
                  handler={handler}
                  index={index}
                  textAreaValue={textAreaValue}
                  componentType={componentType}
                  customStyle={style.actionNavSmile}
                  setTextAreaValue={setTextAreaValue}
                  emojiSize={20}
               />

               <Dropdown overlay={menu}>
                  <div className={`${style.actionNavVars} ${style.actionNavVarsMenu}`}/>
               </Dropdown>
            </div>
            <div/>
         </div>
      </div>
   )
};

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
}))(CodeElement);
