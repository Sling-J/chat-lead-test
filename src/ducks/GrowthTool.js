import {put, call, take, takeEvery, all} from 'redux-saga/effects';

import {appName} from '../config/service/config';
import {Media, GrowthTool} from '../config/service/service';
import {userAccessToken} from "../utils/userToken";

/**
 * Constants
 */

export const moduleName = 'growthTool';
export const prefix = `${appName}/${moduleName}`;

export const UPLOAD_MEDIA_REQUEST = `${prefix}/UPLOAD_MEDIA_REQUEST`;
export const UPLOAD_MEDIA_SUCCESS = `${prefix}/UPLOAD_MEDIA_SUCCESS`;
export const UPLOAD_MEDIA_FAILURE = `${prefix}/UPLOAD_MEDIA_FAILURE`;

export const GET_MLP_REQUEST = `${prefix}/GET_MLP_REQUEST`;
export const GET_MLP_SUCCESS = `${prefix}/GET_MLP_SUCCESS`;
export const GET_MLP_FAILURE = `${prefix}/GET_MLP_FAILURE`;

export const CREATE_MLP_REQUEST = `${prefix}/CREATE_MLP_REQUEST`;
export const CREATE_MLP_SUCCESS = `${prefix}/CREATE_MLP_SUCCESS`;
export const CREATE_MLP_FAILURE = `${prefix}/CREATE_MLP_FAILURE`;

export const DELETE_MLP_REQUEST = `${prefix}/DELETE_MLP_REQUEST`;
export const DELETE_MLP_SUCCESS = `${prefix}/DELETE_MLP_SUCCESS`;
export const DELETE_MLP_FAILURE = `${prefix}/DELETE_MLP_FAILURE`;

export const REFRESH_CREATED_MLP = `${prefix}/REFRESH_CREATED_MLP`;

/**
 * Reducer
 */

const initialState = {
   uploadedData: null,
   loadingOfUpload: false,
   errorOfUpload: null,

   createdMLP: {},
   loadingOfCreation: false,
   errorOfCreation: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case UPLOAD_MEDIA_REQUEST:
         return {
            ...state,
            uploadedData: null,
            loadingOfUpload: true,
            errorOfUpload: null
         };

      case UPLOAD_MEDIA_SUCCESS:
         return {
            ...state,
            uploadedData: action.payload,
            loadingOfUpload: false,
            errorOfUpload: null
         };

      case UPLOAD_MEDIA_FAILURE:
         return {
            ...state,
            uploadedData: null,
            loadingOfUpload: false,
            errorOfUpload: action.error
         };

      case CREATE_MLP_REQUEST:
         return {
            ...state,
            createdMLP: {},
            loadingOfCreation: true,
            errorOfCreation: null
         };

      case CREATE_MLP_SUCCESS:
         return {
            ...state,
            createdMLP: action.payload,
            loadingOfCreation: false,
            errorOfCreation: null
         };

      case CREATE_MLP_FAILURE:
         return {
            ...state,
            createdMLP: {},
            loadingOfCreation: false,
            errorOfCreation: action.error
         };

      case REFRESH_CREATED_MLP:
         return {
            ...state,
            createdMLP: {},
            loadingOfCreation: false,
            errorOfCreation: null
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const uploadImageForMLP = data => ({
   type: UPLOAD_MEDIA_REQUEST,
   payload: data
});

export const createMLP = data => ({
   type: CREATE_MLP_REQUEST,
   payload: data
});

export const getMLP = data => ({
   type: GET_MLP_REQUEST,
   payload: data
});

export const refreshCreatedMLP = () => ({
   type: REFRESH_CREATED_MLP
});

/**
 * Sagas
 */

function* getMLPSaga() {
   while (true) {
      const action = yield take(GET_MLP_REQUEST);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.payload);

         const {data} = yield call(GrowthTool.mlp.get, formData);

         if (data.ok) {
            yield put({type: GET_MLP_SUCCESS, payload: data});
         } else {
            yield put({type: GET_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_MLP_FAILURE, error: e.message});
      }
   }
}

function* createMLPSaga() {
   while (true) {
      const action = yield take(CREATE_MLP_REQUEST);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.payload.botId);
         formData.append('data', JSON.stringify(action.payload.data));

         const {data} = yield call(GrowthTool.mlp.create, formData);

         if (data.ok) {
            yield put({type: CREATE_MLP_SUCCESS, payload: data});
         } else {
            yield put({type: CREATE_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: CREATE_MLP_FAILURE, error: e.message});
      }
   }
}

function* uploadImageForMLPSaga() {
   while (true) {
      const action = yield take(UPLOAD_MEDIA_REQUEST);

      try {
         const formData = new FormData();

         formData.append('type', 'photo');
         formData.append('file', action.payload);

         const {data} = yield call(Media.uploadMedia, formData);

         if (data.ok) {
            yield put({type: UPLOAD_MEDIA_SUCCESS, payload: data.message});
         } else {
            yield put({type: UPLOAD_MEDIA_FAILURE, payload: data.desc});
         }
      } catch (e) {
         yield put({type: UPLOAD_MEDIA_FAILURE, payload: e.message});
      }
   }
}

export const saga = function* () {
   yield all([
      uploadImageForMLPSaga(),
      createMLPSaga(),
      getMLPSaga()
   ]);
};