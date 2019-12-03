import React, {useState} from 'react';
import {connect} from "react-redux";

import ButtonsContainer from "../../messages/buttonsContainer/buttonsContainer";
import HoverBarForMessage from '../hoverBarForMessage/hoverBarForMessage';
import FastButtons from "../../scenariosAndTriggers/triggersContainer/fastButtons/fastButtons";

import {getAllBroadCasts} from "../../../actions/actionCreator";

import style from './textArea.module.sass';

const TextArea = props => {
   const [isTextAreaHovering, setIsTextAreaHovering] = useState(false);
   const {value, handler, index, type} = props;

   const addFullName = name => {
      let myField = document.querySelector(`#insertVariable${index}`);

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
   //
   // useEffect(() => {
   //    if (props.broadCastData) {
   //       console.log(props.broadCastData)
   //    }
   // }, [props.broadCastData]);

   return (
      <div className={style.textArea} key={Object.values(value)[0]}>
         <div className={style.hoverBar}>
            <HoverBarForMessage
               {...props}
            />
         </div>
         <textarea
            id={`insertVariable${index}`}
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

export default connect(({singleBotReducers, broadCastReducers}) => ({
   changedSocial: singleBotReducers.changedSocial,
   broadCastData: broadCastReducers.broadCastData
}), {
   getAllBroadCasts
})(TextArea);
