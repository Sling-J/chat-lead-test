import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {signUpSaga, authSaga, logoutSaga} from "./userSagas";
import {
  createBotSaga,
  getAllBotsSagas,
  getAllScenariesForBotSaga,
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
    updateCaptionTriggerSaga
} from "./botsSagas";
import {
  getManagerSaga,
  editManagerSaga,
    updateBotReactionsSaga
} from "./botSetupSagas";

function* rootSaga() {
  yield takeLatest(ACTION.SIGN_UP_ACTION, signUpSaga);
  yield takeLatest(ACTION.AUTH_ACTION, authSaga);
  yield takeLatest(ACTION.LOGOUT_ACTION, logoutSaga);
  yield takeLatest(ACTION.CREATE_BOT_ACTION, createBotSaga);
  yield takeLatest(ACTION.DELETE_BOT_ACTION, deleteBotSaga);
  yield takeLatest(ACTION.GET_ALL_BOTS_ACTION, getAllBotsSagas);
  yield takeLatest(ACTION.GET_ALL_SCENARIES, getAllScenariesForBotSaga);
  yield takeLatest(ACTION.ADD_NEW_TRIGGER, addNewTriggerSagas);
  yield takeLatest(ACTION.ADD_NEW_SCENARIO, addNewScenarioSagas);
  yield takeLatest(ACTION.UPDATE_TRIGGER, updateTriggerSaga);
  yield takeLatest(ACTION.DELETE_TRIGGER, deleteTriggerSagas);
  yield takeLatest(ACTION.UPDATE_TRIGGER_TEXT, updateCaptionTriggerSaga);
  yield takeLatest(ACTION.DELETE_SCENARIO, deleteScenarioSagas);
  yield takeLatest(ACTION.UPDATE_SOCIAL_IN_TRIGGER, updateSocialInTriggerSagas);
  yield takeLatest(ACTION.GET_ALL_AUTORIDES, getAllAutoridesSagas);
  yield takeLatest(ACTION.APPEND_AUTORIDE, appendNewAutorideSagas);
  yield takeLatest(ACTION.GET_ALL_BROADCASTS, getAllBroadCastSagas);
  yield takeLatest(ACTION.UPDATE_BROADCAST, updateBroadCastSagas);
  yield takeLatest(ACTION.COPY_SCENARIO, copyScenarioSagas);
  yield takeLatest(ACTION.APPEND_BROADCAST, appendBroadCastSagas);
  yield takeLatest(ACTION.DELETE_AUTORIDE, deleteAutorideSagas);
  yield takeLatest(ACTION.EDIT_SCENARIO, editScenarioSagas);
  yield takeLatest(ACTION.GET_BOT_SETUP, getManagerSaga);
  yield takeLatest(ACTION.UPDATE_BOT_SETUP, editManagerSaga);
  yield takeLatest(ACTION.GET_AUTORDIDE_LINKS, getAutorideLinksSagas);
  yield takeLatest(ACTION.UPDATE_BOT_REACTIONS, updateBotReactionsSaga);
}

export default rootSaga;
