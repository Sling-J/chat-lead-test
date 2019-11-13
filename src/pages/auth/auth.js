import React from 'react';
import style from './auth.module.sass';
import chatLead from "../../images/chatlead.png";
// import SignUpForm from "../signUp/signUp";
import AuthForm from '../../componens/forms/authForm/authForm';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";

const Auth = (props) => {

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
                    <AuthForm />
                </div>
            </div>
            {/*<div className={style.authContainer}>*/}
                {/*/!*<Link to={'/signUp'} className={style.link}>Зарегистрироватся</Link>*!/*/}
                {/*/!*<Link to={'/auth'} className={style.link}>Востановить пароль</Link>*!/*/}
            {/*</div>*/}

        </div>
    )
};


export default Auth;