import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';

import {getBotStatistics} from "../api/rest/restContoller";
import {userAccessToken} from "../utils/userToken";

export function* getBotStatisticsSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.GET_BOT_STATISTICS_REQUEST);

         try {
            const res = yield call(getBotStatistics, action.payload);

            if (res.status === 200) {
               yield put({type: ACTION.GET_BOT_STATISTICS_SUCCESS, payload: res.data});
            } else {
               yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: res.data});
            }
         } catch (e) {
            yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: e.message});
         }
      }
   }
}
