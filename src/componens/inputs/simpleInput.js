import React from 'react';

const SimpleInput = (props) => {
   const {
      input,
      // label,
      type,
      // onClick,
      // isValidation = true,
      // meta: {asyncValidating, touched, error}
   } = props;

   return (
      <input
         {...input}
         id={input.name}
         type={type}
         placeholder="Название бота"
      />
   );
};

export default (SimpleInput);