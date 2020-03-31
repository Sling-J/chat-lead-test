import {put, call, take, all, takeEvery} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {Partners} from '../config/service/service';
import {appName} from '../config/service/config';

/**
 * Constants
 */

export const moduleName = 'partners';
const prefix = `${appName}/${moduleName}`;

export const GET_BALANCE_REQUEST = `${prefix}/GET_BALANCE_REQUEST`;
export const GET_BALANCE_SUCCESS = `${prefix}/GET_BALANCE_SUCCESS`;
export const GET_BALANCE_FAILURE = `${prefix}/GET_BALANCE_FAILURE`;

export const ADD_MONEY_REQUEST = `${prefix}/ADD_MONEY_REQUEST`;
export const ADD_MONEY_SUCCESS = `${prefix}/ADD_MONEY_SUCCESS`;
export const ADD_MONEY_FAILURE = `${prefix}/ADD_MONEY_FAILURE`;

export const GET_MONEY_REQUEST = `${prefix}/GET_MONEY_REQUEST`;
export const GET_MONEY_SUCCESS = `${prefix}/GET_MONEY_SUCCESS`;
export const GET_MONEY_FAILURE = `${prefix}/GET_MONEY_FAILURE`;

export const REFRESH_MONEY_ADDING_STATUS = `${prefix}/REFRESH_MONEY_ADDING_STATUS`;

/**
 * Reducer
 */

const initialState = {
   balance: {},
   loadingOfBalance: false,
   errorOfBalance: null,

   moneyAddingSuccess: false,
   loadingOfMoneyAdding: false,
   errorOfMoneyAdding: null,

   pays: [],
   loadingOfPays: false,
   errorOfPays: null
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_BALANCE_REQUEST:
         return {
            ...state,
            balance: {},
            loadingOfBalance: true,
            errorOfBalance: null
         };

      case GET_BALANCE_SUCCESS:
         return {
            ...state,
            balance: action.payload,
            loadingOfBalance: false,
            errorOfBalance: null
         };

      case GET_BALANCE_FAILURE:
         return {
            ...state,
            balance: {},
            loadingOfBalance: false,
            errorOfBalance: action.error
         };

      case ADD_MONEY_REQUEST:
         return {
            ...state,
            loadingOfMoneyAdding: true,
            moneyAddingSuccess: false,
            errorOfMoneyAdding: null
         };

      case ADD_MONEY_SUCCESS:
         return {
            ...state,
            balance: action.payload,
            moneyAddingSuccess: true,
            loadingOfMoneyAdding: false,
            errorOfMoneyAdding: null
         };

      case ADD_MONEY_FAILURE:
         return {
            ...state,
            loadingOfMoneyAdding: false,
            moneyAddingSuccess: false,
            errorOfMoneyAdding: action.error
         };

      case GET_MONEY_REQUEST:
         return {
            ...state,
            pays: [],
            loadingOfPays: true,
            errorOfPays: null
         };

      case GET_MONEY_SUCCESS:
         return {
            ...state,
            pays: action.payload,
            loadingOfPays: false,
            errorOfPays: null
         };

      case GET_MONEY_FAILURE:
         return {
            ...state,
            pays: [],
            loadingOfPays: false,
            errorOfPays: action.error
         };

      case REFRESH_MONEY_ADDING_STATUS:
         return {
            ...state,
            moneyAddingSuccess: false,
            loadingOfMoneyAdding: false,
            errorOfMoneyAdding: null,
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const getBalance = () => ({
   type: GET_BALANCE_REQUEST
});

export const addMoney = data => ({
   type: ADD_MONEY_REQUEST,
   payload: data
});

export const getMoneyRequests = () => ({
   type: GET_MONEY_REQUEST
});

export const refreshMoneyAddingStatus = () => ({
   type: REFRESH_MONEY_ADDING_STATUS
});

/**
 * Sagas
 */

function* getBalanceSaga() {
   if (userAccessToken()) {
      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());

         const {data} = yield call(Partners.getBalance, formData);

         if (data.ok) {
            yield put({
               type: GET_BALANCE_SUCCESS,
               payload: {
                  balance: data.balance,
                  in_processing: data.in_processing,
                  paid_out: data.paid_out,
               }
            });
         } else {
            yield put({type: GET_BALANCE_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_BALANCE_FAILURE, error: e.message});
      }
   }
}

function* addMoneySaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ADD_MONEY_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('amount', action.payload.amount);
            formData.append('card_number', action.payload.card);
            formData.append('type', action.payload.method);

            const {data} = yield call(Partners.addMoneyRequest, formData);

            if (data.ok) {
               yield put({
                  type: ADD_MONEY_SUCCESS,
                  payload: {
                     balance: data.balance,
                     in_processing: data.in_processing,
                     paid_out: data.paid_out,
                  }
               });
            } else {
               yield put({type: ADD_MONEY_FAILURE, error: data.desc});
            }
         } catch (e) {
            yield put({type: ADD_MONEY_FAILURE, error: e.message});
         }
      }
   }
}

function* getMoneyRequestsSaga() {
   if (userAccessToken()) {
      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());

         const {data} = yield call(Partners.getMoneyRequests, formData);

         if (data.ok) {
            yield put({type: GET_MONEY_SUCCESS, payload: data.pays});
         } else {
            yield put({type: GET_MONEY_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_MONEY_FAILURE, error: e.message});
      }
   }
}

export const saga = function* () {
   yield all([
      takeEvery(GET_BALANCE_REQUEST, getBalanceSaga),
      takeEvery(GET_MONEY_REQUEST, getMoneyRequestsSaga),
      addMoneySaga()
   ]);
};