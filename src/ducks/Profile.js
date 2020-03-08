import {put, call, take, all, takeEvery} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {Media, Profile} from '../config/service/service';
import {appName} from '../config/service/config';

/**
 * Constants
 */

export const moduleName = 'profile';
const prefix = `${appName}/${moduleName}`;

export const GET_PROFILE_REQUEST = `${prefix}/GET_PROFILE_REQUEST`;
export const GET_PROFILE_SUCCESS = `${prefix}/GET_PROFILE_SUCCESS`;
export const GET_PROFILE_FAILURE = `${prefix}/GET_PROFILE_FAILURE`;

export const UPDATE_PROFILE_REQUEST = `${prefix}/UPDATE_PROFILE_REQUEST`;
export const UPDATE_PROFILE_SUCCESS = `${prefix}/UPDATE_PROFILE_SUCCESS`;
export const UPDATE_PROFILE_FAILURE = `${prefix}/UPDATE_PROFILE_FAILURE`;

export const UPLOAD_MEDIA_REQUEST = `${prefix}/UPLOAD_MEDIA_REQUEST`;
export const UPLOAD_MEDIA_SUCCESS = `${prefix}/UPLOAD_MEDIA_SUCCESS`;
export const UPLOAD_MEDIA_FAILURE = `${prefix}/UPLOAD_MEDIA_FAILURE`;

export const REFRESH_MEDIA = `${prefix}/REFRESH_MEDIA`;

/**
 * Reducer
 */

const initialState = {
   profile: {},
   successText: null,
   loadingOfProfile: false,
   errorOfProfile: null,

   loadingOfProfileUpdating: false,
   errorOfProfileUpdating: null,

   uploadedData: null,
   loadingOfUploading: false,
   errorOfUploading: null,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case GET_PROFILE_REQUEST:
         return {
            ...state,
            successText: null,
            loadingOfProfile: true,
            errorOfProfile: null,
         };

      case GET_PROFILE_SUCCESS:
         return {
            ...state,
            profile: action.payload,
            successText: null,
            loadingOfProfile: false,
            errorOfProfile: null
         };

      case GET_PROFILE_FAILURE:
         return {
            ...state,
            profile: {},
            successText: null,
            loadingOfProfile: false,
            errorOfProfile: action.error
         };

      case UPDATE_PROFILE_REQUEST:
         return {
            ...state,
            successText: null,
            loadingOfProfileUpdating: true,
            errorOfProfileUpdating: null,
         };

      case UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            profile: action.payload,
            successText: 'Данные успешно изменены!',
            loadingOfProfileUpdating: false,
            errorOfProfileUpdating: null
         };

      case UPDATE_PROFILE_FAILURE:
         return {
            ...state,
            profile: {},
            successText: null,
            loadingOfProfileUpdating: false,
            errorOfProfileUpdating: action.error
         };

      case UPLOAD_MEDIA_REQUEST:
         return {
            ...state,
            successText: null,
            loadingOfUploading: true,
            errorOfUploading: null,
         };

      case UPLOAD_MEDIA_SUCCESS:
         return {
            ...state,
            uploadedData: action.payload,
            successText: 'Данные успешно изменены!',
            loadingOfUploading: false,
            errorOfUploading: null,
         };

      case UPLOAD_MEDIA_FAILURE:
         return {
            ...state,
            uploadedData: null,
            successText: null,
            loadingOfUploading: false,
            errorOfUploading: action.error,
         };

      case REFRESH_MEDIA:
         return {
            ...state,
            uploadedData: null,
            successText: null,
            loadingOfUploading: false,
            errorOfUploading: null,
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const getProfile = () => ({
   type: GET_PROFILE_REQUEST
});

export const updateProfile = data => ({
   type: UPDATE_PROFILE_REQUEST,
   payload: data
});

export const uploadImageForProfile = data => ({
   type: UPLOAD_MEDIA_REQUEST,
   payload: data
});

export const refreshMedia = () => ({
   type: REFRESH_MEDIA
});

/**
 * Sagas
 */

function* getProfileSaga() {
   if (userAccessToken()) {
      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());

         const {data} = yield call(Profile.getProfile, formData);

         if (data.ok) {
            yield put({type: GET_PROFILE_SUCCESS, payload: data.profile});
         } else {
            yield put({type: GET_PROFILE_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_PROFILE_FAILURE, error: e.message});
      }
   }
}

function* updateProfileSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(UPDATE_PROFILE_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('profile', JSON.stringify(action.payload));

            const {data} = yield call(Profile.updateProfile, formData);

            if (data.ok) {
               yield put({type: UPDATE_PROFILE_SUCCESS, payload: data.profile});
            } else {
               yield put({type: UPDATE_PROFILE_FAILURE, error: data.desc});
            }
         } catch (e) {
            yield put({type: UPDATE_PROFILE_FAILURE, error: e.message});
         }
      }
   }
}

function* uploadImageForMLPProfile() {
   while (true) {
      const action = yield take(UPLOAD_MEDIA_REQUEST);

      console.log(action);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('type', 'photo');
         formData.append('file', action.payload.file);
         formData.append('manager_id', action.payload.botId);

         const {data} = yield call(Media.uploadMedia, formData);

         if (data.ok) {
            yield put({type: UPLOAD_MEDIA_SUCCESS, payload: data.message.photo});
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
      takeEvery(GET_PROFILE_REQUEST, getProfileSaga),
      uploadImageForMLPProfile(),
      updateProfileSaga(),
   ]);
};

