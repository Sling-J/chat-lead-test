import React from 'react';
import {NavLink} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import AuthForm from '../../componens/forms/authForm/authForm';
import style from '../../styles/authPage.module.scss';

const Auth = () => (
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
         <div className={style.mainInputContainer}>
            <AuthForm/>
         </div>
      </div>
   </div>
);

export default Auth;
