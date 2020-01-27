import {put, call, take, takeEvery, all} from 'redux-saga/effects';
import {push} from 'connected-react-router';

import {authErrors, signUpErrors} from "../constants/errors/user";
import {appName} from '../config/service/config';
import {Auth} from '../config/service/service';

/**
 * Constants
 */

export const moduleName = 'auth';
export const prefix = `${appName}/${moduleName}`;

export const LOGIN_REQUEST = `${prefix}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}/LOGIN_FAILURE`;

export const REGISTER_REQUEST = `${prefix}/REGISTER_REQUEST`;
export const REGISTER_SUCCESS = `${prefix}/REGISTER_SUCCESS`;
export const REGISTER_FAILURE = `${prefix}/REGISTER_FAILURE`;

export const LOGOUT_REQUEST = `${prefix}/LOGOUT_REQUEST`;
export const LOGOUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`;

/**
 * Reducer
 */

const initialState = {
   userData: null,
   loadingOfUser: false,
   errorOfUser: null
};

export default (state = initialState, action) => {
   switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
         return {
            ...state,
            userData: null,
            loadingOfUser: true,
            errorOfUser: null
         };

      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         return {
            ...state,
            userData: action.payload,
            loadingOfUser: false,
            errorOfUser: null
         };

      case REGISTER_FAILURE:
      case LOGIN_FAILURE:
         return {
            ...state,
            userData: null,
            loadingOfUser: false,
            errorOfUser: action.error
         };

      case LOGOUT_REQUEST:
         return {
            ...state,
            loadingOfUser: true
         };

      case LOGOUT_SUCCESS:
         return {
            ...state,
            userData: null,
            loadingOfUser: false,
            errorOfUser: null
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const login = dataOfForm => ({
   type: LOGIN_REQUEST,
   payload: dataOfForm
});

export const logout = () => ({
   type: LOGOUT_REQUEST
});

export const register = dataOfForm => ({
   type: REGISTER_REQUEST,
   payload: dataOfForm
});

/**
 * Sagas
 */

function* loginSaga() {
   while (true) {
      const action = yield take(LOGIN_REQUEST);

      try {
         const formData = new FormData();

         Object.keys(action.payload).forEach(elem => {
            formData.append(elem, action.payload[elem])
         });

         const {data} = yield call(Auth.login, formData);

         if (data.ok) {
            yield localStorage.setItem('token', data.user_token);

            yield put({type: LOGIN_SUCCESS, payload: data});
            yield put(push('/bots'));
         } else {
            yield put({type: LOGIN_FAILURE, error: authErrors[data.desc]})
         }
      } catch (e) {
         yield put({
            type: LOGIN_FAILURE,
            error: e.message
         })
      }
   }
}

function* registerSaga() {
   while (true) {
      const action = yield take(REGISTER_REQUEST);

      try {
         const formData = new FormData();

         Object.keys(action.payload).forEach(elem => {
            formData.append(elem, action.payload[elem])
         });

         const {data} = yield call(Auth.register, formData);

         if (data.ok) {
            yield localStorage.setItem('token', data.user_token);

            yield put({type: REGISTER_SUCCESS, payload: data});
            yield put(push('/bots'));
         } else {
            yield put({type: REGISTER_FAILURE, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({
            type: LOGIN_FAILURE,
            error: e.message
         })
      }
   }
}

export function* logoutSaga() {
   yield localStorage.removeItem('token');

   yield put({type: LOGOUT_SUCCESS});
   yield put(push('/auth'));
}

export const saga = function* () {
   yield all([
      loginSaga(),
      registerSaga(),
      takeEvery(LOGOUT_REQUEST, logoutSaga)
   ]);
};
