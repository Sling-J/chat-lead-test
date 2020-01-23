import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {login, moduleName as authModule} from "../../../ducks/Auth";

import style from '../../../styles/auth.module.scss';

const AuthForm = props => {
   const [customError, setError] = useState(null);
   const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');
   const [hidden, setHidden] = useState(true);

   const submitHandler = event => {
      event.preventDefault();

      if (login.length !== 0 && password.length !== 0) {
         setError(null);

         const dataOfForm = {
            login,
            password
         };

         props.loginAction(dataOfForm, props.history);
      } else {
         setError('Заполните все поля');
      }
   };

   return (
      <form onSubmit={submitHandler}>
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
               'Войти'
            }
         </Button>

         <p className={style.link}>
            {/* <Link to="/forgotPassword">
               Забыли пароль?
            </Link> */}
         </p>

         <p className={style.error}>
            {props.errorOfUser || customError}
         </p>
      </form>
   )
};


const mapStateToProps = state => ({
   userData: state[authModule].userData,
   loadingOfUser: state[authModule].loadingOfUser,
   errorOfUser: state[authModule].errorOfUser
});

const mapDispatchToProps = dispatch => ({
   loginAction: dataOfForm => dispatch(login(dataOfForm))
});

export default compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(AuthForm);
