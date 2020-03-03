import {put, call, take, all} from 'redux-saga/effects';

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

export const GET_USER_MLP_REQUEST = `${prefix}/GET_USER_MLP_REQUEST`;
export const GET_USER_MLP_SUCCESS = `${prefix}/GET_USER_MLP_SUCCESS`;
export const GET_USER_MLP_FAILURE = `${prefix}/GET_USER_MLP_FAILURE`;

export const CREATE_MLP_REQUEST = `${prefix}/CREATE_MLP_REQUEST`;
export const CREATE_MLP_SUCCESS = `${prefix}/CREATE_MLP_SUCCESS`;
export const CREATE_MLP_FAILURE = `${prefix}/CREATE_MLP_FAILURE`;

export const DELETE_MLP_REQUEST = `${prefix}/DELETE_MLP_REQUEST`;
export const DELETE_MLP_SUCCESS = `${prefix}/DELETE_MLP_SUCCESS`;
export const DELETE_MLP_FAILURE = `${prefix}/DELETE_MLP_FAILURE`;

export const UPDATE_MLP_REQUEST = `${prefix}/UPDATE_MLP_REQUEST`;
export const UPDATE_MLP_SUCCESS = `${prefix}/UPDATE_MLP_SUCCESS`;
export const UPDATE_MLP_FAILURE = `${prefix}/UPDATE_MLP_FAILURE`;

export const REFRESH_MLP_DATA = `${prefix}/REFRESH_MLP_DATA`;

export const defaultMLPSettings = (
   mlpId,
   settingTitle,
   selectedAutoRide,
   socialList,
   file,
   youtubeField,
   description1,
   phone1,
   description2,
   phone2,
   actionText,
   scriptForHead,
   scriptForBody
) => ({
   id: mlpId,
   settings: {
      title: settingTitle,
      autoride_id: selectedAutoRide
   },
   content: {
      media: {
         image: file,
         video: youtubeField
      },
      description: {
         firstSection: {
            title: description1,
            phone: phone1
         },
         secondSection: {
            title: description2,
            phone: phone2
         },
         actionTitle: actionText,
      },
      socialList: socialList,
   },
   code: {
      scriptForHead: scriptForHead,
      scriptForBody: scriptForBody
   }
});

/**
 * Reducer
 */

const initialState = {
   allMLP: [],
   loadingOfMLP: false,
   errorOfMLP: null,

   userMLP: {},
   loadingOfUserMLP: false,
   errorOfUserMLP: null,

   createdMLP: {},
   loadingOfCreation: false,
   errorOfCreation: null,

   updatedMLP: {},
   loadingOfUpdating: false,
   errorOfUpdating: null,

   loadingOfDeleting: false,
   errorOfDeleting: null,

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

      case GET_MLP_REQUEST:
         return {
            ...state,
            loadingOfMLP: true,
            errorOfMLP: null
         };

      case GET_MLP_SUCCESS:
         return {
            ...state,
            allMLP: action.payload,
            loadingOfMLP: false,
            errorOfMLP: null
         };

      case GET_MLP_FAILURE:
         return {
            ...state,
            allMLP: [],
            loadingOfMLP: false,
            errorOfMLP: action.error
         };

      case GET_USER_MLP_REQUEST:
         return {
            ...state,
            userMLP: {},
            loadingOfUserMLP: true,
            errorOfUserMLP: null
         };

      case GET_USER_MLP_SUCCESS:
         return {
            ...state,
            userMLP: action.payload,
            loadingOfUserMLP: false,
            errorOfUserMLP: null
         };

      case GET_USER_MLP_FAILURE:
         return {
            ...state,
            userMLP: {},
            loadingOfUserMLP: false,
            errorOfUserMLP: action.error
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

      case UPDATE_MLP_REQUEST:
         return {
            ...state,
            updatedMLP: {},
            loadingOfUpdating: true,
            errorOfUpdating: null
         };

      case UPDATE_MLP_SUCCESS:
         return {
            ...state,
            updatedMLP: action.payload,
            loadingOfUpdating: false,
            errorOfUpdating: null
         };

      case UPDATE_MLP_FAILURE:
         return {
            ...state,
            updatedMLP: {},
            loadingOfUpdating: false,
            errorOfUpdating: action.error
         };

      case DELETE_MLP_REQUEST:
         return {
            ...state,
            loadingOfDeleting: true,
            errorOfDeleting: null
         };

      case DELETE_MLP_SUCCESS:
         return {
            ...state,
            allMLP: action.payload,
            loadingOfDeleting: false,
            errorOfDeleting: null
         };

      case DELETE_MLP_FAILURE:
         return {
            ...state,
            allMLP: [],
            loadingOfDeleting: false,
            errorOfDeleting: action.error
         };

      case REFRESH_MLP_DATA:
         return {
            ...state,
            userMLP: {},
            createdMLP: {},
            updatedMLP: {},
            loadingOfUserMLP: false,
            loadingOfCreation: false,
            loadingOfUpdating: false,
            errorOfMLP: null,
            errorOfCreation: null,
            errorOfUpdating: null,
         };

      default:
         return state;
   }
};

/**
 * Action Creators
 */

export const getMLP = data => ({
   type: GET_MLP_REQUEST,
   payload: data
});

export const getUserMLP = data => ({
   type: GET_USER_MLP_REQUEST,
   payload: data
});

// export const uploadImageForMLP = data => ({
//    type: UPLOAD_MEDIA_REQUEST,
//    payload: data
// });

export const createMLP = data => ({
   type: CREATE_MLP_REQUEST,
   payload: data
});

export const updateMLP = data => ({
   type: UPDATE_MLP_REQUEST,
   payload: data
});

export const deleteMLP = data => ({
   type: DELETE_MLP_REQUEST,
   payload: data
});

export const refreshMLPData = () => ({
   type: REFRESH_MLP_DATA
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
            yield put({type: GET_MLP_SUCCESS, payload: data.all_mlp});
         } else {
            yield put({type: GET_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_MLP_FAILURE, error: e.message});
      }
   }
}

function* getUserMLPSaga() {
   while (true) {
      const action = yield take(GET_USER_MLP_REQUEST);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.payload.botId);
         formData.append('key', action.payload.mlpId);

         const {data} = yield call(GrowthTool.mlp.getForUser, formData);

         if (data.ok) {
            yield put({type: GET_USER_MLP_SUCCESS, payload: data.mlp});
         } else {
            yield put({type: GET_USER_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: GET_USER_MLP_FAILURE, error: e.message});
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
            yield put({type: CREATE_MLP_SUCCESS, payload: data.mlp});
         } else {
            yield put({type: CREATE_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: CREATE_MLP_FAILURE, error: e.message});
      }
   }
}

function* updateMLPSaga() {
   while (true) {
      const action = yield take(UPDATE_MLP_REQUEST);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.payload.botId);
         formData.append('data', JSON.stringify(action.payload.data));

         const {data} = yield call(GrowthTool.mlp.update, formData);

         if (data.ok) {
            yield put({type: UPDATE_MLP_SUCCESS, payload: data.mlp});
         } else {
            yield put({type: UPDATE_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: UPDATE_MLP_FAILURE, error: e.message});
      }
   }
}

function* deleteMLPSaga() {
   while (true) {
      const action = yield take(DELETE_MLP_REQUEST);

      try {
         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.payload.botId);
         formData.append('mlp_id', action.payload.mlpId);

         const {data} = yield call(GrowthTool.mlp.delete, formData);

         if (data.ok) {
            yield put({type: DELETE_MLP_SUCCESS, payload: data.all_mlp});
         } else {
            yield put({type: DELETE_MLP_FAILURE, error: data.desc});
         }
      } catch (e) {
         yield put({type: DELETE_MLP_FAILURE, error: e.message});
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
      getUserMLPSaga(),
      updateMLPSaga(),
      createMLPSaga(),
      deleteMLPSaga(),
      getMLPSaga(),
   ]);
};