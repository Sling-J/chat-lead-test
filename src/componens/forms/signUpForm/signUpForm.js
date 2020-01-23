import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";

import {register, moduleName as authModule} from "../../../ducks/Auth";

import style from '../../../styles/auth.module.scss';

const SignUpForm = (props) => {
   const [customError, setError] = useState(null);
   const [hidden, setHidden] = useState(true);
   const [hidden2, setHidden2] = useState(true);
   const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');

   const submit = event => {
      event.preventDefault();

      if (login.length !== 0 && password.length !== 0 && passwordConfirm.length !== 0) {
         setError(null);

         if (password.length >= 6 && passwordConfirm.length >= 6) {
            setError(null);

            if (password === passwordConfirm) {
               setError(null);

               const data = {
                  login: login,
                  password: password,
                  passwordConfirm: passwordConfirm,
                  optional_parameters: [
                     "ref",
                     "utm_source"
                  ]
               };

               props.register(data);
            } else {
               setError('Пароли не совпадают');
            }
         } else {
            setError('Пароль не меньше 6 символов');
         }
      } else {
         setError('Заполните все поля');
      }
   };

   return (
      <form autoComplete={'off'} className={style.mainContainer} onSubmit={submit}>
         <div className={style.fieldsContainer}>
            <div className={style.fieldsContainerInput}>
               <TextField
                  fullWidth
                  type="email"
                  label="Электронная почта"
                  placeholder="mail@example.ru"
                  variant="outlined"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
               />
            </div>

            <div className={`${style.fieldsContainerInput} ${style.fieldsContainerInputPass}`}>
               <TextField
                  fullWidth
                  label="Пароль"
                  variant="outlined"
                  value={password}
                  type={hidden ? 'password' : 'text'}
                  onChange={e => setPassword(e.target.value)}
               />
               <IconButton className={style.fieldsContainerInputIcon} onClick={() => setHidden(!hidden)} size="small">
                  {hidden
                     ? <VisibilityOffIcon style={{fontSize: "20px"}}/>
                     : <VisibilityIcon style={{fontSize: "20px"}}/>
                  }
               </IconButton>
            </div>

            <div className={`${style.fieldsContainerInput} ${style.fieldsContainerInputPass}`}>
               <TextField
                  fullWidth
                  label="Подтвердите пароль"
                  variant="outlined"
                  value={passwordConfirm}
                  type={hidden2 ? 'password' : 'text'}
                  onChange={e => setPasswordConfirm(e.target.value)}
               />
               <IconButton className={style.fieldsContainerInputIcon} onClick={() => setHidden2(!hidden2)} size="small">
                  {hidden2
                     ? <VisibilityOffIcon style={{fontSize: "20px"}}/>
                     : <VisibilityIcon style={{fontSize: "20px"}}/>
                  }
               </IconButton>
            </div>
         </div>

         <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={props.loadingOfUser}
            className={style.submitButton}
         >
            {props.loadingOfUser ?
               <CircularProgress size={21} color="white"/> :
               'Создать аккаунт'
            }
         </Button>

         <p className={style.offerta}>
            Продолжая, вы соглашаетесь с нашей
            <span> политикой конфиденциальности </span> и
            <span> правилами пользования</span>
         </p>

         <p className={style.error}>
            {props.errorOfUser || customError}
         </p>
      </form>
   );
};

const mapStateToProps = state => ({
   userData: state[authModule].userData,
   loadingOfUser: state[authModule].loadingOfUser,
   errorOfUser: state[authModule].errorOfUser
});

const mapDispatchToProps = dispatch => ({
   register: dataOfForm => dispatch(register(dataOfForm))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(SignUpForm);
