import React, {useState} from 'react';
// import { Field } from 'redux-form';

import style from './fansyInput.module.sass';

const FancyInput = props => {
   const {
      input,
      label,
      type,
      placeholder,
      onClick,
      meta: {
         touched,
         error
      }
   } = props;

   const [isFocusInInput, setStatusForFocus] = useState(false);

   return (
      <div className={style.mainContainer}>
         <label htmlFor={input.name} onClick={onClick}>{label}</label>
         <input
            {...input}
            id={input.name}
            type={type}
            className={isFocusInInput ? style.activeInput : style.input}
            placeholder={placeholder}
            onFocus={() => setStatusForFocus(true)}
            onBlur={() => setStatusForFocus(false)}
         />
         {touched && error && <span className={style.errorMessage}>{error}</span>}
      </div>
   );
};


export default (FancyInput);
