import {put, call, take, all, takeEvery} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {Payments} from '../config/service/service';
import {appName} from '../config/service/config';

/**
 * Constants
 */

export const moduleName = 'payment';
const prefix = `${appName}/${moduleName}`;

export const ADD_PAYMENT_REQUEST = `${prefix}/ADD_PAYMENT_REQUEST`;
export const ADD_PAYMENT_SUCCESS = `${prefix}/ADD_PAYMENT_SUCCESS`;
export const ADD_PAYMENT_FAILURE = `${prefix}/ADD_PAYMENT_FAILURE`;

export const GET_TRANSACTIONS_REQUEST = `${prefix}/GET_TRANSACTIONS_REQUEST`;
export const GET_TRANSACTIONS_SUCCESS = `${prefix}/GET_TRANSACTIONS_SUCCESS`;
export const GET_TRANSACTIONS_FAILURE = `${prefix}/GET_TRANSACTIONS_FAILURE`;

/**
 * Reducer
 */

const initialState = {
   payment: {},
   transactions: [],
   loadingOfPayment: false,
   loadingOfTransactions: false,
   errorOfPayment: null,
   errorOfOfTransactions: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case ADD_PAYMENT_REQUEST:
         return {
            ...state,
            payment: {},
            loadingOfPayment: true,
            errorOfPayment: null
         };

      case ADD_PAYMENT_SUCCESS:
         return {
            ...state,
            payment: action.payload,
            loadingOfPayment: false,
            errorOfPayment: null
         };

      case ADD_PAYMENT_FAILURE:
         return {
            ...state,
            payment: {},
            loadingOfPayment: false,
            errorOfPayment: action.error
         };

      case GET_TRANSACTIONS_REQUEST:
         return {
            ...state,
            transactions: [],
            loadingOfTransactions: true,
            errorOfOfTransactions: null
         };

      case GET_TRANSACTIONS_SUCCESS:
         return {
            ...state,
            transactions: action.payload,
            loadingOfTransactions: false,
            errorOfOfTransactions: null
         };

      case GET_TRANSACTIONS_FAILURE:
         return {
            ...state,
            transactions: [],
            loadingOfTransactions: false,
            errorOfOfTransactions: action.error
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const addPayment = data => ({
   type: ADD_PAYMENT_REQUEST,
   payload: data
});

export const getTransactions = () => ({
   type: GET_TRANSACTIONS_REQUEST
});

/**
 * Sagas
 */

function* addPaymentSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ADD_PAYMENT_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('payment', JSON.stringify(action.payload));

            const {data} = yield call(Payments.addPayment, formData);

            if (data.ok) {
               yield put({type: ADD_PAYMENT_SUCCESS, payload: data});
            } else {
               yield put({type: ADD_PAYMENT_FAILURE, error: data.desc});
            }
         } catch (e) {
            yield put({type: ADD_PAYMENT_FAILURE, error: e.message});
         }
      }
   }
}

function* getTransactionsSaga() {
   if (userAccessToken()) {
      try {
         const formData = new FormData();
         formData.append('user_token', userAccessToken());

         const {data} = yield call(Payments.getTransactions, formData);

         if (data.ok) {
            yield put({type: GET_TRANSACTIONS_SUCCESS, payload: data.transactions});
         } else {
            yield put({type: GET_TRANSACTIONS_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_TRANSACTIONS_FAILURE, error: e.message});
      }
   }
}

export const saga = function* () {
   yield all([
      addPaymentSaga(),
      takeEvery(GET_TRANSACTIONS_REQUEST, getTransactionsSaga)
   ]);
};

