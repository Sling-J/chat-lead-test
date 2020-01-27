import {put, call, take, all} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {appName} from '../config/service/config';
import {Tags} from '../config/service/service';

/**
 * Constants
 */

export const moduleName = 'tags';
export const prefix = `${appName}/${moduleName}`;

export const GET_TAGS_REQUEST = `${prefix}/GET_TAGS_REQUEST`;
export const GET_TAGS_SUCCESS = `${prefix}/GET_TAGS_SUCCESS`;
export const GET_TAGS_FAILURE = `${prefix}/GET_TAGS_FAILURE`;

/**
 * Reducer
 */

const initialState = {
	loadingOfTags: false,
	errorOfTags: null,
	tags: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TAGS_REQUEST:
			return {
				...state,
				loadingOfTags: true,
				errorOfTags: null,
				tags: [],
			};

		case GET_TAGS_SUCCESS:
			return {
				...state,
				loadingOfTags: false,
				errorOfTags: null,
				tags: action.payload,
			};

		case GET_TAGS_FAILURE:
			return {
				...state,
				loadingOfTags: false,
				errorOfTags: action.error,
				tags: [],
			};

		default:
			return state;
	}
};

/**
 * Action Creators
 */

export const getTags = botId => ({
	type: GET_TAGS_REQUEST,
	payload: botId
});

/**
 * Sagas
 */

function* getTagsSaga() {
   if (userAccessToken()) {
      while (true) {
			const action = yield take(GET_TAGS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('bot_id', action.payload);

            const {data} = yield call(Tags.getTagsStatistic, formData);

            if (data.ok) {
					yield put({type: GET_TAGS_SUCCESS, payload: data})
				} else {
					yield put({type: GET_TAGS_FAILURE, error: data.desc})
				}
         } catch (e) {
            yield put({type: GET_TAGS_FAILURE, error: e.message});
         }
      }
   }
}

export const saga = function* () {
   yield all([
		getTagsSaga()
   ]);
};
