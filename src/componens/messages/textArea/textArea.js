import React, {useState, Fragment} from 'react';
import {connect} from "react-redux";

import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import FastButtons from "../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons";

import style from './textArea.module.sass';

const PaymentTextArea = props => {
   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);
   const {value, handler, index, componentType} = props;

   const addFullName = name => {
      let myField = document.querySelector(`#insertVariable-${componentType}${index}`);
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

      let input = myField.value;
      input += myValue;
      myField.value = input;
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
            onBlur={(e) => handler(e, index, componentType)}
            defaultValue={value.text}
         />
         <div className={style.actionNav}>
            <div className={style.actionButtons}>
               <div
                  className={style.actionNavSmile}
               >
               </div>
               <div
                  className={style.actionNavVars}
                  onMouseEnter={handleMouseHover}
                  onMouseLeave={handleMouseHover}
               >
                  {isTextAreaHovering &&
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
                  </div>}
               </div>

            </div>
            <div/>
         </div>
         {componentType !== 'payment' && (
            <Fragment>
               <ButtonsContainer
                  {...props}
               />
               {(props.changedSocial === 'facebook' || props.changedSocial === 'telegram') && (
                  <FastButtons
                     {...props}
                  />
               )}
            </Fragment>
         )}
      </div>
   )
};

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
}))(PaymentTextArea);
