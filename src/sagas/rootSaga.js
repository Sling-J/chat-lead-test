import {takeLatest, takeEvery, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {saga as authSaga} from '../ducks/Auth';
import {saga as tagsSaga} from '../ducks/Tags';
import {
   createBotSaga,
   getAllBotsSagas,
   getAllScenariosForBotSaga,
   addNewScenarioSagas,
   updateTriggerSaga,
   updateSocialInTriggerSagas,
   deleteBotSaga,
   deleteScenarioSagas,
   addNewTriggerSagas,
   getAllAutoridesSagas,
   appendNewAutorideSagas,
   getAllBroadCastSagas,
   updateBroadCastSagas,
   copyScenarioSagas,
   appendBroadCastSagas,
   deleteAutorideSagas,
   editScenarioSagas,
   getAutorideLinksSagas,
   deleteTriggerSagas,
   updateCaptionTriggerSaga,
   deleteBroadcastSaga
} from "./botsSagas";
import {
   getManagerSaga,
   editManagerSaga,
   updateBotReactionsSaga,
   facebookAuthSaga,
   vkAuthSaga,
	getQRCodeSaga,
	getWpScreenshotSaga,
	getWpStatusSaga,
	logoutWpSaga
} from "./botSetupSagas";
import {
   getBotStatisticsSaga,
   exportUsersSaga,
   importUsersSaga
} from "./botStatisticsSaga"
import {
   addPaymentSaga,
   getTransactionsSaga
} from "./botPaymentSaga"

function* rootSaga() {
   yield all([
      getBotStatisticsSaga(),
		getWpScreenshotSaga(),
		facebookAuthSaga(),
		getWpStatusSaga(),
		exportUsersSaga(),
		importUsersSaga(),
		addPaymentSaga(),
		getQRCodeSaga(),
		logoutWpSaga(),
		vkAuthSaga(),
		tagsSaga(),
      authSaga(),
      takeEvery(ACTION.GET_TRANSACTIONS_REQUEST, getTransactionsSaga),
      takeLatest(ACTION.CREATE_BOT_ACTION, createBotSaga),
      takeLatest(ACTION.DELETE_BOT_ACTION, deleteBotSaga),
      takeLatest(ACTION.GET_ALL_BOTS_ACTION, getAllBotsSagas),
      takeLatest(ACTION.GET_ALL_SCENARIOS, getAllScenariosForBotSaga),
      takeLatest(ACTION.ADD_NEW_TRIGGER, addNewTriggerSagas),
      takeLatest(ACTION.ADD_NEW_SCENARIO, addNewScenarioSagas),
      takeLatest(ACTION.UPDATE_TRIGGER, updateTriggerSaga),
      takeLatest(ACTION.DELETE_TRIGGER, deleteTriggerSagas),
      takeLatest(ACTION.UPDATE_TRIGGER_TEXT, updateCaptionTriggerSaga),
      takeLatest(ACTION.DELETE_SCENARIO, deleteScenarioSagas),
      takeLatest(ACTION.UPDATE_SOCIAL_IN_TRIGGER, updateSocialInTriggerSagas),
      takeLatest(ACTION.GET_ALL_AUTORIDES, getAllAutoridesSagas),
      takeLatest(ACTION.APPEND_AUTORIDE, appendNewAutorideSagas),
      takeLatest(ACTION.GET_ALL_BROADCASTS, getAllBroadCastSagas),
      takeLatest(ACTION.UPDATE_BROADCAST, updateBroadCastSagas),
      takeLatest(ACTION.COPY_SCENARIO, copyScenarioSagas),
      takeLatest(ACTION.APPEND_BROADCAST, appendBroadCastSagas),
      takeLatest(ACTION.DELETE_AUTORIDE, deleteAutorideSagas),
      takeLatest(ACTION.DELETE_BROADCAST, deleteBroadcastSaga),
      takeLatest(ACTION.EDIT_SCENARIO, editScenarioSagas),
      takeLatest(ACTION.GET_BOT_SETUP, getManagerSaga),
      takeLatest(ACTION.UPDATE_BOT_SETUP, editManagerSaga),
      takeLatest(ACTION.GET_AUTORDIDE_LINKS, getAutorideLinksSagas),
      takeLatest(ACTION.UPDATE_BOT_REACTIONS, updateBotReactionsSaga),
   ]);
}

export default rootSaga;
