import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import style from './signUp.module.sass';
import SignUpForm from '../../componens/forms/signUpForm/signUpForm';
import chatLead from '../../images/chatlead.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";


const SignUp = (props) => {


    return (
        <div className={style.mainContainer}>
            <div className={style.formContainer}>
                <div className={style.tabContainer}>
                    <NavLink
                        to={'/auth'}
                        className={style.linkElement}
                        activeClassName={style.activeLinkElement}
                    >
                        <FontAwesomeIcon icon={faLock}/> <span>Войти</span>
                    </NavLink>
                    <NavLink
                        to={'/signUp'}
                        className={style.linkElement}
                        activeClassName={style.activeLinkElement}
                    >
                        <FontAwesomeIcon icon={faUserPlus}/> <span>Создать аккаунт</span>
                    </NavLink>
                </div>
                <div className={style.inputContainer}>
                    <SignUpForm />
                </div>
            </div>

        </div>
    )
};

export default SignUp;
