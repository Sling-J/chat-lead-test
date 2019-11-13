import React, {useState} from "react";
import { Field, reduxForm } from 'redux-form';
import {withRouter} from 'react-router';
import {connect} from "react-redux";
import validate from "../../../utils/validation/registrValidate";
import FancyInput from "../../inputs/fancyInput";
// import {sendFormDataSignUp} from "../../../actions/actionCreator";
import style from "./signUpForm.module.sass";
import {signUp, auth} from "../../../actions/actionCreator";


const SignUpForm = (props) => {
    const {registration} = props;
    console.log(props);
    const [isError, setError] = useState(false);
    const data = registration && {
        ...registration.values,
        optional_parameters: [
            "ref",
            "utm_source"
        ]
    }

    const submit = (values) => {

        if(registration.syncErrors) {
            setError(true);
        }else {
            props.signUpAction(data, props.history);
            props.authAction(data, props.history);
        }

    };


    return(
        <form autoComplete={'off'} className={style.mainContainer}>
            <div className={style.fieldsContainer}>
                <Field
                    name={'login'}
                    type={'text'}
                    component={FancyInput}
                    label={'Email:'}
                    placeholder={'mail@example.com'}
                />
               <div className={style.passwordContainer}>
                   <div className={style.inputPasswordContainer}>
                       <Field
                           name={'password'}
                           type={'password'}
                           component={FancyInput}
                           label={'Пароль:'}
                       />
                   </div>
                   <div className={style.inputPasswordContainer}>
                       <Field
                           name={'passwordConfirm'}
                           type={'password'}
                           component={FancyInput}
                           label={'Повторите пароль:'}
                       />
                   </div>
               </div>
            </div>
            <div
                className={style.submitButton}
                onClick={submit}
            >
                Создать аккаунт
            </div>

            <div className={style.errorsContainer}>
                <div className={style.error}>{props.error}</div>
                {isError && (
                    <div className={style.error}>Введите пожалуйста коректные данные</div>
                )}
            </div>

            <p>
                Продолжая, вы соглашаетесь с нашей
                <span> политикой конфиденциальности </span> и
                <span> правилами пользования</span>
            </p>
        </form>
    );
};

const mapStateToProps = state => {
    const {registration} = state.form;
    const {userData, isFetching, error} = state.userReducers;

    return {
        registration, userData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    signUpAction: (signUpData, history) => dispatch(signUp(signUpData, history)),
    authAction: (authData, history) => dispatch(auth(authData, history))
});



export default reduxForm({
    form: 'registration',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm)));