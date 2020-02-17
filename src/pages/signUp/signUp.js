import React from 'react';
import {NavLink} from 'react-router-dom';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faUserPlus} from "@fortawesome/free-solid-svg-icons";

import SignUpForm from '../../componens/forms/signUpForm/signUpForm';

import style from '../../styles/authPage.module.scss';

const SignUp = () => (
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
            <SignUpForm/>
         </div>
      </div>
   </div>
);

export default SignUp;
