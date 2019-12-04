import ACTION from '../actions/actionTypes';
import {put, call} from 'redux-saga/effects';
import {signUp, auth} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";


export function* signUpSaga({signUpData, history}) {
   try {
      yield put({type: ACTION.USER_DATA_REQUEST});

      const formData = new FormData();
      Object.keys(signUpData).forEach(elem => {
         formData.append(elem, signUpData[elem])
      });

      const {data} = yield call(signUp, formData);

      if (data.ok) {
         yield put({type: ACTION.USER_DATA_RESPONSE, data: data});
         yield localStorage.setItem('token', data.user_token);
         yield history.push('/bots');
      } else {
         yield put({type: ACTION.USER_DATA_ERROR, error: signUpErrors[data.desc]})
      }
   } catch (e) {
      yield put({type: ACTION.USER_DATA_ERROR, error: e.message})
   }
}

export function* authSaga({authData, history}) {
   try {
      yield put({type: ACTION.USER_DATA_REQUEST});

      const formData = new FormData();
      Object.keys(authData).forEach(elem => {
         formData.append(elem, authData[elem])
      });

      const {data} = yield call(auth, formData);

      if (data.ok) {
         yield put({type: ACTION.USER_DATA_RESPONSE, data: data});
         yield localStorage.setItem('token', data.user_token);
         yield history.push("/bots");
      } else {
         yield put({type: ACTION.USER_DATA_ERROR, error: authErrors[data.desc]})
      }
   } catch (e) {
      yield put({type: ACTION.USER_DATA_ERROR, error: e.message})
   }
}

export function* logoutSaga({history}) {
   yield localStorage.removeItem('token');
   yield history.push('/auth');
}

