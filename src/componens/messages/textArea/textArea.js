import React, {useState, Fragment, useEffect} from 'react';
import {connect} from "react-redux";

import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import FastButtons from "../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons";
import EmojiPicker from "./emojiPicker/emojiPicker";

import style from './textArea.module.sass';

const PaymentTextArea = props => {
   const {value, handler, index, componentType} = props;

   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);
   const [textAreaValue, setTextAreaValue] = useState('');

   useEffect(() => {
      setTextAreaValue(value.text);
   }, []);

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

   const handleMouseHover = () => {
      setIsTextAreaHovering(!isTextAreaHovering);
   };

   return (
      <div className={style.textArea} key={Object.values(value)[0]}>
         {componentType !== 'send_time' && (
            <div className={style.hoverBar}>
               <HoverBarForMessage
                  {...props}
               />
            </div>
         )}
         <textarea
            id={`insertVariable-${componentType}${index}`}
            onChange={e => setTextAreaValue(e.target.value)}
            onBlur={() => handler({target: {value: textAreaValue}}, index, componentType)}
            value={textAreaValue}
         />
         <div className={style.actionNav}>
            <div className={style.actionButtons}>
               <EmojiPicker
                  handler={handler}
                  index={index}
                  textAreaValue={textAreaValue}
                  componentType={componentType}
                  customStyle={style.actionNavSmile}
                  setTextAreaValue={setTextAreaValue}
                  emojiSize={20}
               />

               <div
                  className={style.actionNavVars}
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseHover}
               >
                  {isTextAreaHovering && (
                     <div className={style.actionNavVarsMenu}>
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
                  )}
               </div>
            </div>
            <div/>
         </div>
         {componentType !== 'payment' && (
            <Fragment>
               <ButtonsContainer {...props}/>
               {(props.changedSocial === 'facebook' || props.changedSocial === 'telegram') && (
                  <FastButtons {...props}/>
               )}
            </Fragment>
         )}
      </div>
   )
};

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
}))(PaymentTextArea);
