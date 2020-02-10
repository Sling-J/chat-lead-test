import {put, call, take, all} from 'redux-saga/effects';

import {userAccessToken} from "../utils/userToken";
import {appName} from '../config/service/config';
import {Tags} from '../config/service/service';

/**
 * Constants
 */

export const moduleName = 'tags';
export const prefix = `${appName}/${moduleName}`;

export const ADD_TAGS_REQUEST = `${prefix}/ADD_TAGS_REQUEST`;
export const ADD_TAGS_SUCCESS = `${prefix}/ADD_TAGS_SUCCESS`;
export const ADD_TAGS_FAILURE = `${prefix}/ADD_TAGS_FAILURE`;

export const DELETE_TAGS_REQUEST = `${prefix}/DELETE_TAGS_REQUEST`;
export const DELETE_TAGS_SUCCESS = `${prefix}/DELETE_TAGS_SUCCESS`;
export const DELETE_TAGS_FAILURE = `${prefix}/DELETE_TAGS_FAILURE`;

export const GET_TAGS_REQUEST = `${prefix}/GET_TAGS_REQUEST`;
export const GET_TAGS_SUCCESS = `${prefix}/GET_TAGS_SUCCESS`;
export const GET_TAGS_FAILURE = `${prefix}/GET_TAGS_FAILURE`;

/**
 * Reducer
 */

const initialState = {
	loadingOfAdding: false,
	loadingOfDeleting: false,
	loadingOfTags: false,

	errorOfAdding: null,
	errorOfDeleting: null,
	errorOfTags: null,

	tags: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TAGS_REQUEST:
			return {
				...state,
				loadingOfAdding: true,
				errorOfAdding: null,
			};

		case ADD_TAGS_SUCCESS:
			return {
				...state,
				loadingOfAdding: false,
				errorOfAdding: null,
				tags: action.payload,
			};

		case ADD_TAGS_FAILURE:
			return {
				...state,
				loadingOfAdding: false,
				errorOfAdding: action.error,
			};

		case DELETE_TAGS_REQUEST:
			return {
				...state,
				loadingOfDeleting: true,
				errorOfDeleting: null,
			};

		case DELETE_TAGS_SUCCESS:
			return {
				...state,
				loadingOfDeleting: false,
				errorOfDeleting: null,
				tags: action.payload,
			};

		case DELETE_TAGS_FAILURE:
			return {
				...state,
				loadingOfDeleting: false,
				errorOfDeleting: action.error,
			};

		case GET_TAGS_REQUEST:
			return {
				...state,
				loadingOfTags: true,
				errorOfTags: null,
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

export const addTag = data => ({
	type: ADD_TAGS_REQUEST,
	payload: data
});

export const deleteTag = data => ({
	type: DELETE_TAGS_REQUEST,
	payload: data
});

export const getTags = botId => ({
	type: GET_TAGS_REQUEST,
	payload: botId
});

/**
 * Sagas
 */

function* addTagsSaga() {
   if (userAccessToken()) {
      while (true) {
			const action = yield take(ADD_TAGS_REQUEST);

         try {
            const formData = new FormData();

            formData.append('user_token', userAccessToken());
            formData.append('tag', action.payload.tag);
            formData.append('bot_id', action.payload.botId);

            const {data} = yield call(Tags.addTag, formData);

            if (data.ok) {
					yield put({type: ADD_TAGS_SUCCESS, payload: data.tags});
				} else {
					yield put({type: ADD_TAGS_FAILURE, error: data.desc});
				}
         } catch (e) {
            yield put({type: ADD_TAGS_FAILURE, error: e.message});
         }
      }
   }
}

function* deleteTagsSaga() {
	if (userAccessToken()) {
		while (true) {
			const action = yield take(DELETE_TAGS_REQUEST);

			try {
				const formData = new FormData();

				formData.append('user_token', userAccessToken());
				formData.append('tag', action.payload.tag);
				formData.append('bot_id', action.payload.botId);

				const {data} = yield call(Tags.deleteTag, formData);

				if (data.ok) {
					yield put({type: DELETE_TAGS_SUCCESS, payload: data.tags});
				} else {
					yield put({type: DELETE_TAGS_FAILURE, error: data.desc});
				}
			} catch (e) {
				yield put({type: DELETE_TAGS_FAILURE, error: e.message});
			}
		}
	}
}

function* getTagsSaga() {
	if (userAccessToken()) {
		while (true) {
			const action = yield take(GET_TAGS_REQUEST);

			try {
				const formData = new FormData();

				formData.append('user_token', userAccessToken());
				formData.append('bot_id', action.payload);

				const {data} = yield call(Tags.getTags, formData);

				if (data.ok) {
					yield put({type: GET_TAGS_SUCCESS, payload: data.tags});
				} else {
					yield put({type: GET_TAGS_FAILURE, error: data.desc});
				}
			} catch (e) {
				yield put({type: GET_TAGS_FAILURE, error: e.message});
			}
		}
	}
}

export const saga = function* () {
   yield all([
		getTagsSaga(),
		addTagsSaga(),
		deleteTagsSaga()
   ]);
};
