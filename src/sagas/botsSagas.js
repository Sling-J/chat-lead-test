import {put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
   createBot,
   getAllBotsForUser,
   getScenariesForManager,
   addNewScenario,
   copyScenario,
   updateTrigger,
   uploadMedia,
   deleteBot,
   deleteScenario,
   addNewTrigger,
   getAllAutorides,
   addNewAutoride,
   getAllBroadCasts,
   updateBroadCasts,
   deleteAutoride,
   copyAutoRide,
   appendBroadCast,
   editScenario,
   getAutoridesLink,
   deleteTrigger,
   deleteBroadcast
} from "../api/rest/restContoller";
import {signUpErrors} from "../constants/errors/user";
import {destinationScenario} from "../constants/defaultValues";

import {userAccessToken} from "../utils/userToken";

export function* createBotSaga({createBotData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BOTS_DATA_REQUEST});

         const formData = new FormData();

         formData.append('name', createBotData);
         formData.append('user_token', userAccessToken());

         const {data} = yield call(createBot, formData);

         if (data.ok) {
            const {data} = yield call(getAllBotsForUser, formData);
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data.managers});
         } else {
            yield put({type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.BOTS_DATA_ERROR, error: e.message})
      }
   }
}

export function* deleteBotSaga({deleteBotData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BOTS_DATA_REQUEST});

         Object.assign(deleteBotData, {
            user_token: userAccessToken()
         });

         const formData = new FormData();
         Object.keys(deleteBotData).forEach(elem => {
            formData.append(elem, deleteBotData[elem])
         });

         const {data} = yield call(deleteBot, formData);

         if (data.ok) {
            const {data} = yield call(getAllBotsForUser, formData);
            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data.managers});
         } else {
            yield put({type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.BOTS_DATA_ERROR, error: e.message})
      }
   }
}

export function* getAllBotsSagas({botId}) {
   let singleBotData = null;

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BOTS_DATA_REQUEST});

         const formData = new FormData();

         formData.append('user_token', userAccessToken());

         const {data} = yield call(getAllBotsForUser, formData);

         if (data.ok) {
            if (botId) singleBotData = data.managers.find(elem => elem.id === parseInt(botId));

            yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data.managers, changedBotData: singleBotData});
         } else {
            yield put({type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.BOTS_DATA_ERROR, error: e.message})
      }
   }
}

export function* getAllScenariosForBotSaga({idBot}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_ALL_SCENARIOS_REQUEST});

         const formData = new FormData();
         formData.append('manager_id', idBot);
         formData.append('user_token', userAccessToken());

         const {data} = yield call(getScenariesForManager, formData);

         if (data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]});
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}


export function* addNewScenarioSagas({botId, destination, trigger_text}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

         const formData = new FormData();
         formData.append('manager_id', botId);
         formData.append('user_token', userAccessToken());
         formData.append('trigger_text', trigger_text);
         formData.append('destination', destination);

         const newScearioStatus = yield call(addNewScenario, formData);

         if (newScearioStatus.data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[newScearioStatus.data.desc]});
         }

         yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: newScearioStatus.data.scenario.id});
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message});
      }
   }
}

export function* editScenarioSagas({scenarioData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

         const formData = new FormData();
         formData.append('manager_id', scenarioData.botId);
         formData.append('user_token', userAccessToken());
         formData.append('trigger_text', scenarioData.trigger_text);
         formData.append('scenario_id', scenarioData.scenarioId);

         if (scenarioData.trigger_text.length > 0) {
            const {data} = yield call(editScenario, formData);

            if (data.ok) {
               const [allScenaries, allAutorides] = yield all([
                  call(getScenariesForManager, formData),
                  call(getAllAutorides, formData)
               ]);
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
               yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
            } else {
               yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
            }
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* copyScenarioSagas({scenarioData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('bot_id', scenarioData.managerId);
         formData.append('scenario_id', scenarioData.id);

         const {data} = yield call(copyScenario, formData);

         if (data.ok) {
            const formData2 = new FormData();

            formData2.append('user_token', userAccessToken());
            formData2.append('manager_id',  scenarioData.managerId);
            formData2.append('trigger_text', scenarioData.trigger_text);
            formData2.append('destination', scenarioData.destination);

            const {data} = yield call(getScenariesForManager, formData2);

            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* deleteScenarioSagas({scenarioData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_ALL_SCENARIOS_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', scenarioData.botId);
         formData.append('scenario_id', scenarioData.idScenario);

         const {data} = yield call(deleteScenario, formData);

         if (data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}


export function* addNewTriggerSagas({triggerData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

         const formData = new FormData();

         formData.append('manager_id', triggerData.manager_id);
         formData.append('user_token', userAccessToken());
         formData.append('scenario_id', triggerData.scenario_id);
         formData.append('messages', JSON.stringify({facebook: [], telegram: [], vk: [], whatsapp: []}));
         formData.append('social', 'telegram');
         // formData.append('caption', 'Новый тригер');

         const {data} = yield call(addNewTrigger, formData);

         if (data.ok) {
            const res = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: res.data.scenarios});
            yield put({type: ACTION.ADD_NEW_TRIGGER_SUCCESS, payload: data.trigger.id});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* updateTriggerSaga({triggerData, updationData, changedSocial}) {
   const {messages, index, id, caption, botId, changedSlide, type} = triggerData;

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.EDIT_TRIGGER_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('trigger_id', id);
         formData.append('caption', caption);
         formData.append('manager_id', botId);

         if (updationData) {
            formData.append('type', updationData.type);
            formData.append('file', updationData.file);

            console.log(updationData.type);
            console.log(updationData.file);

            const {data} = yield call(uploadMedia, formData);

            if (data.ok) {
               if (changedSlide || changedSlide === 0) {
                  Object.assign(messages[changedSocial][index][type][changedSlide], {
                     photo: data.message[updationData.type].url
                  });
               } else {
                  Object.assign(messages[changedSocial][index], {
                     [updationData.type]: data.message[updationData.type].url
                  })
               }
            }
         }

         formData.append('messages', JSON.stringify(messages));

         const {data} = yield call(updateTrigger, formData);

         if (data.ok) {
            const allScenarios = yield call(getScenariesForManager, formData);

            if (allScenarios.data.ok) {
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
            } else {
               yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: allScenarios.data.desc})
            }
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: data.desc})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* deleteTriggerSagas({triggerData}) {
   const {botId, id} = triggerData;

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.EDIT_TRIGGER_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('trigger_id', id);
         formData.append('manager_id', botId);

         const {data} = yield call(deleteTrigger, formData);

         if (data.ok) {
            const allScenarios = yield call(getScenariesForManager, formData);

            if (allScenarios.data.ok) {
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
            }
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* updateCaptionTriggerSaga({triggerData}) {
   const {id, caption, botId} = triggerData;

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.EDIT_TRIGGER_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('trigger_id', id);
         formData.append('caption', caption);
         formData.append('manager_id', botId);

         const {data} = yield call(updateTrigger, formData);

         if (data.ok) {
            const allScenarios = yield call(getScenariesForManager, formData);

            if (allScenarios.data.ok) {
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
            }
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}


export function* updateSocialInTriggerSagas({triggerData}) {
   const {id, botId, social} = triggerData;

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('trigger_id', id);
         formData.append('manager_id', botId);
         formData.append('social', social);

         const {data} = yield call(updateTrigger, formData);

         if (data.ok) {
            const {data} = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message})
      }
   }
}

export function* getAllAutoridesSagas({botId}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_AUTORIDE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', botId);

         const allAutorides = yield call(getAllAutorides, formData);

         if (allAutorides.data.ok) {
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});

            const allScenaries = yield call(getScenariesForManager, formData);
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

         } else {
            yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[allAutorides.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.AUTORIDE_ERROR, error: e.message})
      }
   }
}

export function* appendNewAutorideSagas({managerId, trigger_text}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.AUTORIDE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', managerId);
         formData.append('trigger_text', trigger_text);
         formData.append('destination', destinationScenario.autoride);

         const createScenarioStatus = yield call(addNewScenario, formData);

         if (createScenarioStatus.data.ok) {
            formData.append('trigger_text', trigger_text);
            formData.append('scenario_id', createScenarioStatus.data.scenario.id);

            const [createAutorideStatus, allScenarios] = yield all([
               call(addNewAutoride, formData),
               call(getScenariesForManager, formData)
            ]);

            if (createAutorideStatus.data.ok) {
               const allAutorides = yield call(getAllAutorides, formData);

               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenarios.data.scenarios});
               yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
               yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: createScenarioStatus.data.scenario.id})
            }
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, dataScenarios: createScenarioStatus.data.desc});
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: e.message});
      }
   }
}

export function* getAllBroadCastSagas({managerId}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_ALL_BROADCASTS_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', managerId);

         const [allBroadcast, allScenaries] = yield all([
            call(getAllBroadCasts, formData),
            call(getScenariesForManager, formData),
         ]);

         if (allBroadcast.data.ok) {
            yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});

            if (allScenaries.data.ok) {
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
            }

         } else {
            yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.BROADCAST_ERROR, error: e.message})
      }
   }
}

export function* updateBroadCastSagas({broadCastData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BROADCAST_REQUEST});

         const formData = new FormData();

         formData.append('user_token', userAccessToken());
         formData.append('manager_id', broadCastData.managerId);
         formData.append('broadcast_id', broadCastData.id);
         formData.append('tag', broadCastData.tag);
         formData.append('for_group', broadCastData.for_group);
         formData.append('proccessing', broadCastData.proccessing);
         formData.append('time', broadCastData.time.toFixed(0));

         if (broadCastData.sent) {
            formData.append('sent', broadCastData.sent);
         }

         const updateStatus = yield call(updateBroadCasts, formData);

         if (updateStatus.data.ok) {
            const [allBroadcast, allScenaries] = yield all([
               call(getAllBroadCasts, formData),
               call(getScenariesForManager, formData)
            ]);

            if (allBroadcast.data.ok) {
               yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
            }

            if (allScenaries.data.ok) {
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
            }
         } else {
            yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[updateStatus.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.BROADCAST_ERROR, error: e.message})
      }
   }
}

export function* appendBroadCastSagas({data}) {
   const futureTime = new Date().setFullYear(new Date().getFullYear() + 1);

   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BROADCAST_CREATE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', data.managerId);
         formData.append('destination', destinationScenario.broadcast);
         formData.append('trigger_text', 'Сценарий для рассылки');

         const scenarioCreateStatus = yield call(addNewScenario, formData);

         if (scenarioCreateStatus.data.ok) {
            formData.append('scenario_id', scenarioCreateStatus.data.scenario.id);
            formData.append('time', (futureTime / 1000).toFixed(0));

            const broadCastCreateStatus = yield call(appendBroadCast, formData);

            if (broadCastCreateStatus.data.ok) {
               const [allBroadcast, allScenaries] = yield all([
                  call(getAllBroadCasts, formData),
                  call(getScenariesForManager, formData),
               ]);
               if (allBroadcast.data.ok) {
                  yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
               }
               if (allScenaries.data.ok) {
                  yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
                  yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: scenarioCreateStatus.data.scenario.id})
               }
            }
         } else {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[scenarioCreateStatus.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: e.message})
      }
   }
}

export function* deleteBroadcastSaga({data}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.BROADCAST_DELETE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', data.managerId);
         formData.append('broadcast_id', data.broadCastId);

         const delBroadCastStatus = yield call(deleteBroadcast, formData);

         if (delBroadCastStatus.data.ok) {
            const [allBroadcast, allScenaries] = yield all([
               call(getAllBroadCasts, formData),
               call(getScenariesForManager, formData),
            ]);

            if (allBroadcast.data.ok && allScenaries.data.ok) {
               yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
               yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
            } else {
               yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
            }
         } else {
            yield put({type: ACTION.BROADCAST_ERROR, error: delBroadCastStatus.data.desc})
         }
      } catch (e) {
         yield put({type: ACTION.BROADCAST_ERROR, error: e.message})
      }
   }
}

export function* copyAutorideSagas(action) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_AUTORIDE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('bot_id', action.data.managerId);
         formData.append('autoride_id', action.data.id);

         const {data} = yield call(copyAutoRide, formData);

         if (data.ok) {
            const formData2 = new FormData();
            formData2.append('user_token', userAccessToken());
            formData2.append('manager_id', action.data.managerId);

            const allAutorides = yield call(getAllAutorides, formData2);
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
         } else {
            yield put({type: ACTION.AUTORIDE_ERROR, error: data.desc});
         }
      } catch (e) {
         yield put({type: ACTION.AUTORIDE_ERROR, error: e.message});
      }
   }
}

export function* deleteAutorideSagas({data}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.GET_AUTORIDE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', data.managerId);
         formData.append('auto_ride_id', data.idAutoride);

         const delAutorideStatus = yield call(deleteAutoride, formData);

         if (delAutorideStatus.data.ok) {
            const allAutorides = yield call(getAllAutorides, formData);
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
         } else {
            yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[delAutorideStatus.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.AUTORIDE_ERROR, error: e.message})
      }
   }
}

export function* getAutorideLinksSagas({autorideData}) {
   if (userAccessToken()) {
      try {
         yield put({type: ACTION.AUTORIDE_REQUEST});

         const formData = new FormData();
         formData.append('user_token', userAccessToken());
         formData.append('manager_id', autorideData.managerId);
         formData.append('autoride_id', autorideData.idAutoride);
         formData.append('social', 'all');

         const [autoridesLinks, autoridesData] = yield all([
            call(getAutoridesLink, formData),
            call(getAllAutorides, formData)
         ]);

         if (autoridesLinks.data.ok && autoridesData.data.ok) {
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesLinks: autoridesLinks.data.links, autoridesData: autoridesData.data.auto_rides});
         } else {
            yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[autoridesLinks.data.desc]})
         }
      } catch (e) {
         yield put({type: ACTION.AUTORIDE_ERROR, error: e.message})
      }
   }
}



