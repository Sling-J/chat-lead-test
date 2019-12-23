import React, {useState} from 'react';
import {connect} from "react-redux";

import {Dropdown} from 'antd';

import style from './paymentTextArea.module.sass';

const PaymentTextArea = props => {
   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);
   const {index, componentType, failureAction, setFailureAction} = props;

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
      let myField = document.querySelector(`#insertVariable-${componentType}${index}`);
      let myValue;
      console.log(myField);

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

      console.log(input)
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
               <div className={style.actionNavSmile}/>

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
}))(PaymentTextArea);
