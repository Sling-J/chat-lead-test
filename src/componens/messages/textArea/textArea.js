import React, {useState} from 'react';
import style from './textArea.module.sass';
import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import ContentEditable from 'react-contenteditable';
import {connect} from "react-redux";
import FastButtons from "../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons";


const TextArea = (props) => {
   const {value, handler, index, type} = props;
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
      <div className={style.textArea} key={Object.values(value)[0]}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
               styleForBar={{bottom: '0', left: '163px'}}
               // statusDraggable={(status) => setStatusDragable(status)}
            />
         </div>
         <textarea
            id="insertVariable"
            onBlur={(e) => handler(e, index, type)}
            defaultValue={Object.values(value)[0]}
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

export default connect(mapStateToProps)(TextArea);
