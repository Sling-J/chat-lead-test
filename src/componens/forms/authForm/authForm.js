import React from 'react';
import style from './auth.module.sass';
import {Field, reduxForm} from "redux-form";
import FancyInput from "../../inputs/fancyInput";
import {connect} from "react-redux";
import {auth} from "../../../actions/actionCreator";
import {withRouter, Link} from "react-router-dom";

const AuthForm = (props) => {
   const submitHandler = (e) => {
      e.preventDefault();
      props.authAction(props.auth.values, props.history);
   };

   return (
      <form autoComplete={'off'} className={style.mainContainer} onSubmit={submitHandler}>
         <div className={style.fieldsContainer}>
            <div className={style.inputContainer}>
               <Field
                  name={'login'}
                  type={'text'}
                  component={FancyInput}
                  label={'Email:'}
                  placeholder={'mail@example.com'}
               />
            </div>
            <div className={style.inputContainer}>
               <Field
                  name={'password'}
                  type={'password'}
                  component={FancyInput}
                  label={'Пароль:'}
               />
            </div>
         </div>
         <button className={style.submitButton}>
            Войти
         </button>

         <Link to={'/forgotPassword'} className={style.link}>Забыли пароль?</Link>
         <div className={style.error}>{props.error}</div>
      </form>
   )
};


const mapStateToProps = state => {
   const {auth} = state.form;
   const {userData, isFetching, error} = state.userReducers;

   return {
      auth, userData, isFetching, error
   }
};

const mapDispatchToProps = dispatch => ({
   authAction: (authData, history) => dispatch(auth(authData, history))
});


export default reduxForm({
   form: 'auth'
})(withRouter((connect(mapStateToProps, mapDispatchToProps)(AuthForm))));
