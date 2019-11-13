import React from 'react';
import style from './auth.module.sass';
import {Field, reduxForm} from "redux-form";
import FancyInput from "../../inputs/fancyInput";
import {connect} from "react-redux";
import {auth} from "../../../actions/actionCreator";
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";

const AuthForm = (props) => {

    const sumbitHandler = () => {

        props.authAction(props.auth.values, props.history);
    };


  return (
      <form autoComplete={'off'} className={style.mainContainer}>
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
          <div
              className={style.submitButton}
              onClick={sumbitHandler}
          >
              Войти
          </div>

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