import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';

import {addPayment, getTransactions} from "../api/rest/restContoller";
import {userAccessToken} from "../utils/userToken";

export function* addPaymentSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.ADD_PAYMENT_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('payment', JSON.stringify(action.payload));

            const {data} = yield call(addPayment, formData);

            if (data.ok) {
               yield put({type: ACTION.ADD_PAYMENT_SUCCESS, payload: data});
            } else {
               yield put({type: ACTION.ADD_PAYMENT_FAILURE, error: data.desc});
            }
         } catch (e) {
            yield put({type: ACTION.ADD_PAYMENT_FAILURE, error: e.message});
         }
      }
   }
}

export function* getTransactionsSaga() {
   if (userAccessToken()) {
      try {
         const formData = new FormData();
         formData.append('user_token', userAccessToken());

         const {data} = yield call(getTransactions, formData);

         if (data.ok) {
            yield put({type: ACTION.GET_TRANSACTIONS_SUCCESS, payload: data.transactions});
         } else {
            yield put({type: ACTION.GET_TRANSACTIONS_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: ACTION.GET_TRANSACTIONS_FAILURE, error: e.message});
      }
   }
}
