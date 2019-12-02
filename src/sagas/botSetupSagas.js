import {put, call, take} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
   getManager,
   editManager,
   getFacebookAuthUrl,
   getVkAuthUrl,
   getQRCodeUrl,
   getScenariesForManager,
   addNewScenario
} from "../api/rest/restContoller";
import {signUpErrors} from "../constants/errors/user";
import {destinationScenario} from "../constants/defaultValues";

import {userAccessToken} from "../utils/userToken";

export function* getManagerSaga({idBot}) {
   if (userAccessToken()) {
      yield put({type: ACTION.BOT_SETUP_REQUEST});

      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', idBot);

      const {data} = yield call(getManager, formData);

      if (data.ok) {
         yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
      } else {
         yield put({type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc]})
      }
   }
}

export function* editManagerSaga({setupData}) {
   if (userAccessToken()) {
      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', setupData.idBot);

      if (setupData.optional_params !== undefined) {
         for (let param of setupData.optional_params) {
            formData.append(param, setupData[param]);
         }
      }

      const {data} = yield call(editManager, formData);

      if (data.ok) {
         yield put({type: ACTION.BOT_SETUP_RESPONSE, data: data.manager});
      } else {
         yield put({type: ACTION.BOT_SETUP_ERROR, error: signUpErrors[data.desc]})
      }
   }
}

export function* facebookAuthSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.GET_FACEBOOK_AUTH_URL_REQUEST);

         try {
            const formData = new FormData();
            formData.append('user_token', localStorage.getItem('token'));
            formData.append('manager_id', action.idBot);

            const {data} = yield call(getFacebookAuthUrl, formData);

            if (data.ok || data.url.length !== 0) {
               yield put({type: ACTION.GET_FACEBOOK_AUTH_URL_SUCCESS, payload: data.url})
            } else {
               yield put({type: ACTION.GET_FACEBOOK_AUTH_URL_FAILURE, error: signUpErrors[data.desc]})
            }
         } catch (err) {
            yield put({type: ACTION.GET_FACEBOOK_AUTH_URL_FAILURE, error: err.message})
         }
      }
   }
}

export function* vkAuthSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.GET_VK_AUTH_URL_REQUEST);

         try {
            const formData = new FormData();
            formData.append('user_token', localStorage.getItem('token'));
            formData.append('manager_id', action.idBot);

            const {data} = yield call(getVkAuthUrl, formData);

            if (data.ok || data.url.length !== 0) {
               yield put({type: ACTION.GET_VK_AUTH_URL_SUCCESS, payload: data.url})
            } else {
               yield put({type: ACTION.GET_VK_AUTH_URL_FAILURE, error: signUpErrors[data.desc]})
            }
         } catch (err) {
            yield put({type: ACTION.GET_VK_AUTH_URL_FAILURE, error: err.message})
         }
      }
   }
}

export function* getQRCodeSaga() {
   if (userAccessToken()) {
      while (true) {
         const action = yield take(ACTION.GET_WA_QR_URL_REQUEST);

         try {
            const formData = new FormData();
            formData.append('user_token', localStorage.getItem('token'));
            formData.append('manager_id', action.idBot);

            const {data} = yield call(getQRCodeUrl, formData);

            if (data.ok || data.url.length !== 0) {
               yield put({type: ACTION.GET_WA_QR_URL_SUCCESS, payload: data.url})
            } else {
               yield put({type: ACTION.GET_WA_QR_URL_FAILURE, error: signUpErrors[data.desc]})
            }
         } catch (err) {
            yield put({type: ACTION.GET_WA_QR_URL_FAILURE, error: err.message})
         }
      }
   }
}

export function* updateBotReactionsSaga({reactionsData}) {
   if (userAccessToken()) {
      yield put({type: ACTION.BOT_SETUP_REQUEST});

      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', reactionsData.botId);

      const allScenarios = yield call(getScenariesForManager, formData);

      if (allScenarios.data.ok) {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: allScenarios.data.desc})
      }

      const scenarioForBotReaction
         = allScenarios.data.scenarios.filter(elem => elem.destination === reactionsData.typeReaction);

      if (scenarioForBotReaction.length > 0) {
         if (reactionsData.statusChecked) {
            formData.append(reactionsData.typeReaction, scenarioForBotReaction[0].id);
            const {data} = yield call(editManager, formData);

            if (data.ok) {
               yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: scenarioForBotReaction[0].id})
            }
         } else {
            formData.append(reactionsData.typeReaction, null);
            // const {data} = yield call(editManager, formData);
         }

      } else {
         formData.append(
            'trigger_text',
            reactionsData.typeReaction === destinationScenario.welcome_message ?
               'Сценарий для приветствия' : 'Сценарий для неизвестной команды'
         );
         formData.append('destination', reactionsData.typeReaction);
         const {data} = yield call(addNewScenario, formData);

         if (data.ok) {
            const newArrayScenarios = allScenarios.data.scenarios;
            newArrayScenarios.push(data.scenario);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: newArrayScenarios});

            if (reactionsData.statusChecked) {
               formData.append(reactionsData.typeReaction, data.scenario.id);
               // const statusEdit = yield call(editManager, formData);
               yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: data.scenario.id})
            }
         }
      }

      const managerOptions = yield call(getManager, formData);

      if (managerOptions.data.ok) {
         yield put({type: ACTION.BOT_SETUP_RESPONSE, data: managerOptions.data.manager});
      }
   }
}
