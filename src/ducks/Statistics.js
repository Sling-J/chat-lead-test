import {put, call, take, all} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {BotStatistics} from '../config/service/service';
import {appName} from '../config/service/config';

/**
 * Constants
 */

export const moduleName = 'statistics';
export const prefix = `${appName}/${moduleName}`;

export const GET_BOT_STATISTICS_REQUEST = `${prefix}/GET_BOT_STATISTICS_REQUEST`;
export const GET_BOT_STATISTICS_SUCCESS = `${prefix}/GET_BOT_STATISTICS_SUCCESS`;
export const GET_BOT_STATISTICS_FAILURE = `${prefix}/GET_BOT_STATISTICS_FAILURE`;

export const EXPORT_USERS_REQUEST = `${prefix}/EXPORT_USERS_REQUEST`;
export const EXPORT_USERS_SUCCESS = `${prefix}/EXPORT_USERS_SUCCESS`;
export const EXPORT_USERS_FAILURE = `${prefix}/EXPORT_USERS_FAILURE`;

export const IMPORT_USERS_REQUEST = `${prefix}/IMPORT_USERS_REQUEST`;
export const IMPORT_USERS_SUCCESS = `${prefix}/IMPORT_USERS_SUCCESS`;
export const IMPORT_USERS_FAILURE = `${prefix}/IMPORT_USERS_FAILURE`;

export const RESET_EXPORTED_USERS = `${prefix}/RESET_EXPORTED_USERS`;

/**
 * Reducer
 */

const initialState = {
   statistics: {},
   loadingOfStatistics: false,
   errorOfStatistics: null,

   exportedUsers: {},
   loadingOfExport: false,
   errorOfExport: null,

   importedUsers: {},
   loadingOfImport: false,
   errorOfImport: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_BOT_STATISTICS_REQUEST:
         return {
            ...state,
            statistics: {},
            loadingOfStatistics: true,
            errorOfStatistics: null
         };

      case GET_BOT_STATISTICS_SUCCESS:
         return {
            ...state,
            statistics: action.payload,
            loadingOfStatistics: false,
            errorOfStatistics: null
         };

      case GET_BOT_STATISTICS_FAILURE:
         return {
            ...state,
            statistics: {},
            loadingOfStatistics: false,
            errorOfStatistics: action.error
         };

      case EXPORT_USERS_REQUEST:
         return {
            ...state,
            exportedUsers: {},
            loadingOfExport: true,
            errorOfExport: null,
         };

      case EXPORT_USERS_SUCCESS:
         return {
            ...state,
            exportedUsers: action.payload,
            loadingOfExport: false,
            errorOfExport: null,
         };

      case EXPORT_USERS_FAILURE:
         return {
            ...state,
            exportedUsers: {},
            loadingOfExport: false,
            errorOfExport: action.error,
         };

      case IMPORT_USERS_REQUEST:
         return {
            ...state,
            importedUsers: {},
            loadingOfImport: true,
            errorOfImport: action.error,
         };

      case IMPORT_USERS_SUCCESS:
         return {
            ...state,
            importedUsers: action.payload,
            loadingOfImport: false,
            errorOfImport: null,
         };

      case IMPORT_USERS_FAILURE:
         return {
            ...state,
            importedUsers: {},
            loadingOfImport: false,
            errorOfImport: action.error,
         };

      case RESET_EXPORTED_USERS:
         return {
            ...state,
            exportedUsers: {},
            loadingOfExport: false,
            errorOfExport: null,
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const getBotStatistics = data => ({
   type: GET_BOT_STATISTICS_REQUEST,
   payload: data
});

export const exportUsers = data => ({
   type: EXPORT_USERS_REQUEST,
   payload: data
});

export const importUsers = data => ({
   type: IMPORT_USERS_REQUEST,
   payload: data
});

export const resetExportedUsers = () => ({
   type: RESET_EXPORTED_USERS
});

/**
 * Sagas
 */

function* getBotStatisticsSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(GET_BOT_STATISTICS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('manager_id', action.payload.botId);
            formData.append('start_date', action.payload.startDate);
            formData.append('end_date', action.payload.endDate);

            const {data} = yield call(BotStatistics.getBotStatistics, formData);

            if (data.ok) {
               yield put({type: GET_BOT_STATISTICS_SUCCESS, payload: data});
            } else {
               yield put({type: GET_BOT_STATISTICS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: GET_BOT_STATISTICS_FAILURE, error: e.message});
         }
      }
   }
}

function* exportUsersSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(EXPORT_USERS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('bot_id', action.payload.botId);
            formData.append('messenger', action.payload.messenger);

            const {data} = yield call(BotStatistics.exportUsers, formData);

            if (data.ok) {
               yield put({type: EXPORT_USERS_SUCCESS, payload: data});
            } else {
               yield put({type: EXPORT_USERS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: EXPORT_USERS_FAILURE, error: e.message});
         }
      }
   }
}

function* importUsersSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(IMPORT_USERS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('bot_id', action.payload.botId);
            formData.append('messenger', action.payload.messenger);
            formData.append("filename", action.payload.filename);
            formData.append("user_id_field", action.payload.field);

            const {data} = yield call(BotStatistics.importUsers, formData);

            if (data.ok) {
               yield put({type: IMPORT_USERS_SUCCESS, payload: data});
            } else {
               yield put({type: IMPORT_USERS_FAILURE, error: data});
            }
         } catch (e) {
            yield put({type: IMPORT_USERS_FAILURE, error: e.message});
         }
      }
   }
}

export const saga = function* () {
   yield all([
      getBotStatisticsSaga(),
      exportUsersSaga(),
      importUsersSaga(),
   ]);
};
