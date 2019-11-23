import React from 'react';
// import { Field } from 'redux-form';
import style from './botCreateInput.module.sass';

const BotCreateInput = (props) => {
   const {
      input,
      label,
      type,
      placeholder,
      onClick,
      // isValidation = true,
      meta: {
         // asyncValidating,
         touched,
         error
      }
   } = props;

   // const [isFocusInInput, setStatusForFocus] = useState(false);


   return (
      <div className={style.mainContainer}>

         <label htmlFor={input.name} onClick={onClick}>{label}</label>
         <input
            {...input}
            id={input.name}
            type={type}
            className={style.input}
            placeholder={placeholder}
            // onFocus={() => setStatusForFocus(true)}
            // onBlur={() => setStatusForFocus(false)}
         />
         {touched && error && <span className={style.errorMessage}>{error}</span>}
      </div>
   );
};


export default BotCreateInput;
