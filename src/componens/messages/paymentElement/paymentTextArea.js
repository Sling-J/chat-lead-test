import React, {useState} from 'react';
import {connect} from "react-redux";

import style from './paymentTextArea.module.sass';

const TextArea = props => {
   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);
   const {index, componentType, failureAction, setFailureAction} = props;

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
      <div className={style.textArea}>
         <textarea
            id={`insertVariable-${componentType}${index}`}
            value={failureAction}
            onChange={e => setFailureAction(e.target.value)}
            placeholder="Напишите сообщение, который будет отправить пользователю, если в процессе оплаты возникнут ошибки."
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
      </div>
   )
};

export default connect(({singleBotReducers}) => ({
   changedSocial: singleBotReducers.changedSocial
}))(TextArea);
