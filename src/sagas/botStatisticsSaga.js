import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';

import {getBotStatistics, exportUsers, importUsers} from "../api/rest/restContoller";
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

            const {data} = yield call(getBotStatistics, formData);

            if (data.ok) {
               yield put({type: ACTION.GET_BOT_STATISTICS_SUCCESS, payload: data});
            } else {
               yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: ACTION.GET_BOT_STATISTICS_FAILURE, error: e.message});
         }
      }
   }
}

export function* exportUsersSaga() {
   if (userAccessToken()) {
      while (true) {
			const action = yield take(ACTION.EXPORT_USERS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
				formData.append('bot_id', action.payload.botId);
				formData.append('messenger', action.payload.messenger);

            const {data} = yield call(exportUsers, formData);

            if (data.ok) {
               yield put({type: ACTION.EXPORT_USERS_SUCCESS, payload: data});
            } else {
               yield put({type: ACTION.EXPORT_USERS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: ACTION.EXPORT_USERS_FAILURE, error: e.message});
         }
      }
   }
}

export function* importUsersSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.IMPORT_USERS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('bot_id', action.payload.botId);
            formData.append('messenger', action.payload.messenger);
            formData.append("filename", action.payload.filename);
            formData.append("user_id_field", action.payload.field);

            const {data} = yield call(importUsers, formData);

            if (data.ok) {
               yield put({type: ACTION.IMPORT_USERS_SUCCESS, payload: data});
            } else {
               yield put({type: ACTION.IMPORT_USERS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: ACTION.IMPORT_USERS_FAILURE, error: e.message});
         }
      }
   }
}
