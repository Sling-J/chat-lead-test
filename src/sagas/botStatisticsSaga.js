import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';

import {getBotStatistics} from "../api/rest/restContoller";
import {userAccessToken} from "../utils/userToken";

export function* getBotStatisticsSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.GET_BOT_STATISTICS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('manager_id', action.payload.botId);
            formData.append('start_date', action.payload.startDate);
            formData.append('end_date', action.payload.endDate);

            const res = yield call(getBotStatistics, formData);

            console.log(res);

            if (res.data.ok) {
               yield put({type: ACTION.GET_BOT_STATISTICS_SUCCESS, payload: res.data});
            } else {
               yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: res.data});
            }
         } catch (e) {
            yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: e.message});
            console.log(e);
         }
      }
   }
}
