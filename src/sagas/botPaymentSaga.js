import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';

import {addPayment} from "../api/rest/restContoller";
import {userAccessToken} from "../utils/userToken";

export function* addPaymentSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.ADD_PAYMENT_REQUEST);

         try {
            // const formData = new FormData();
            const jsonData = {
               user_token: userAccessToken(),
               payment: action.payload
            };

            // formData.append('user_token', userAccessToken());
            // formData.append('payment', JSON.stringify(action.payload));

            console.log(action);

            const {data} = yield call(addPayment, jsonData);

            if (data.ok) {
               yield put({type: ACTION.ADD_PAYMENT_SUCCESS, payload: data});
            } else {
               yield put({type: ACTION.ADD_PAYMENT_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: ACTION.ADD_PAYMENT_FAILURE, error: e.message});
         }
      }
   }
}
