import React, {useState} from 'react';
import style from './timerTextArea.module.sass';
import ButtonsContainer from "../../buttonsContainer/buttonsContainer";
import FastButtons from "../../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons"
import {connect} from "react-redux";

const TimerTextArea = (props) => {
   const {value, handler, index, optionalType} = props;

   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);

   const addName = () => {
      let myField = document.querySelector(`#insertVariable2${index}`);
      let myValue = props.changedSocial === 'whatsapp'
         ? " {name}"
         : " {first_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const addLastName = () => {
      let myField = document.querySelector(`#insertVariable2${index}`);
      let myValue = props.changedSocial === 'whatsapp'
         ? " {phone}"
         : " {last_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const handleMouseHover = () => {
      setIsTextAreaHovering(!isTextAreaHovering);
   };

   return (
      <div className={style.textArea} key={Object.values(value)[2]}>
         <textarea
            id={`insertVariable2${index}`}
            onBlur={(e) => handler(e, index, optionalType)}
            defaultValue={Object.values(value)[2]}
         />
         <div className={style.actionNav}>
            <div className={style.actionButtons}>
               <div className={style.actionNavSmile}>
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
                        <li onClick={addName}>Имя</li>
                        {props.changedSocial === 'whatsapp' ? (
                           <li onClick={addLastName}>Телефон</li>
                        ) : (
                           <li onClick={addLastName}>Фамилия</li>
                        )}
                     </ul>
                  </div>}
               </div>

            </div>
            <div/>
         </div>
         <ButtonsContainer
            {...props}
         />
         {(props.changedSocial === 'facebook' || props.changedSocial === 'telegram') && (
            <FastButtons
               {...props}
            />
         )}
      </div>
   )
};

const mapStateToProps = state => {
   const {changedSocial} = state.singleBotReducers;

   return {
      changedSocial
   }
};

export default connect(mapStateToProps)(TimerTextArea);
