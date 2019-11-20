import {
   validationSignUpEmailSchema,
   validationSignUpPasswordSchema
} from "./Schemas/SignUpValidationSchemas";

const Joi = require('joi');


const validationRegister = values => {
   const errors = {};
   const {
      login,
      password,
      passwordConfirm
   } = values;


   Joi.validate({
      login: login
   }, validationSignUpEmailSchema, (err) => {
      err && (
         errors.login
            = "Некоректная почта"
      );
   });

   Joi.validate({
      password: password
   }, validationSignUpPasswordSchema, (err) => {
      err && (
         errors.password
            = "Пароль должен быть больше 6 символов и меньше 30"
      );
   });

   if (password !== passwordConfirm) {
      errors.passwordConfirm = 'Пароли не совпадают'
   }


   return errors;
};


export default validationRegister
