import {put, call, take, takeEvery, all} from 'redux-saga/effects';

import {appName} from '../config/service/config';
import {Media} from '../config/service/service';

/**
 * Constants
 */

export const moduleName = 'growthTool';
export const prefix = `${appName}/${moduleName}`;

export const UPLOAD_MEDIA_REQUEST = `${prefix}/UPLOAD_MEDIA_REQUEST`;
export const UPLOAD_MEDIA_SUCCESS = `${prefix}/UPLOAD_MEDIA_SUCCESS`;
export const UPLOAD_MEDIA_FAILURE = `${prefix}/UPLOAD_MEDIA_FAILURE`;

/**
 * Reducer
 */

const initialState = {
   uploadedData: null,
   loadingOfUpload: false,
   errorOfUpload: null
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
   }
};

/**
 * Action Creators
 */

export const uploadImageForMLP = data => ({
   type: UPLOAD_MEDIA_REQUEST,
   payload: data
});

/**
 * Sagas
 */

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
      uploadImageForMLPSaga()
   ]);
};