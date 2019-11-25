import React, {useState} from 'react';
import style from './timerTextArea.module.sass';
import ButtonsContainer from "../../buttonsContainer/buttonsContainer";
import {connect} from "react-redux";

const TimerTextArea = (props) => {
   const {value, handler, index, type, changedTrigger, optionalType} = props;
   const [valueTextArea, setValueTextArea] = useState({
      target: {
         value: Object.values(value)[0]
      }
   });

   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);

   const addName = () => {
      let myField = document.querySelector("#insertVariable");
      let myValue = " {first_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const addLastName = () => {
      let myField = document.querySelector("#insertVariable");
      let myValue = " {last_name}";
      let input = myField.value;
      input += myValue;
      myField.value = input;
   };

   const handleMouseHover = () => {
      setIsTextAreaHovering(!isTextAreaHovering);
      console.log(isTextAreaHovering);
   };

   return (
      <div className={style.textArea} key={Object.values(value)[2]}>
         <textarea
            id="insertVariable"
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
                        <li onClick={addLastName}>Фамилия</li>
                     </ul>
                  </div>}
               </div>

            </div>
            <div/>
         </div>
         <ButtonsContainer
            {...props}
         />
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