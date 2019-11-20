import {put, call, all} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import {
   createBot,
   getAllBotsForUser,
   getScenariesForManager,
   addNewScenario,
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
   appendBroadCast,
   editScenario,
   getAutoridesLink,
   deleteTrigger
} from "../api/rest/restContoller";
import {signUpErrors, authErrors} from "../constants/errors/user";
import {destinationScenario} from "../constants/defaultValues";


export function* createBotSaga({createBotData}) {

   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BOTS_DATA_REQUEST});

      Object.assign(createBotData, {
         user_token: localStorage.getItem('token')
      });

      const formData = new FormData();
      Object.keys(createBotData).forEach(elem => {
         formData.append(elem, createBotData[elem])
      });

      const {data} = yield call(createBot, formData);

      if (data.ok) {
         const {data} = yield call(getAllBotsForUser, formData);
         yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data.managers});
      } else {
         yield put({type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }

}

export function* deleteBotSaga({deleteBotData}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BOTS_DATA_REQUEST});

      Object.assign(deleteBotData, {
         user_token: localStorage.getItem('token')
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

   }

}

export function* getAllBotsSagas({botId}) {
   let singleBotData = null;

   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BOTS_DATA_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));

      const {data} = yield call(getAllBotsForUser, formData);

      if (botId) {
         singleBotData = data.managers.filter(elem => elem.id == botId)[0];
      }


      if (data.ok) {
         yield put({type: ACTION.BOTS_DATA_RESPONSE, data: data.managers, changedBotData: singleBotData});
      } else {
         yield put({type: ACTION.BOTS_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }
}

export function* getAllScenariesForBotSaga({idBot}) {

   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('manager_id', idBot);
      formData.append('user_token', localStorage.getItem('token'));


      const {data} = yield call(getScenariesForManager, formData);

      // console.log(data.scenarios);

      // console.log(data);


      if (data.ok) {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }
}


export function* addNewScenarioSagas({botId, destination, trigger_text}) {

   if (localStorage.getItem('token')) {

      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('manager_id', botId);
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('trigger_text', trigger_text);
      formData.append('destination', destination);


      const newScearioStatus = yield call(addNewScenario, formData);


      if (newScearioStatus.data.ok) {
         const {data} = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[newScearioStatus.data.desc]})
      }


      yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: newScearioStatus.data.scenario.id})


   }
}

export function* editScenarioSagas({scenarioData}) {

   if (localStorage.getItem('token')) {

      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('manager_id', scenarioData.botId);
      formData.append('user_token', localStorage.getItem('token'));
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
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[data.desc]})
         }
      }


   }
}

export function* deleteScenarioSagas({scenarioData}) {

   if (localStorage.getItem('token')) {

      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('manager_id', scenarioData.botId);
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('scenario_id', scenarioData.idScenario);


      const {data} = yield call(deleteScenario, formData);

      if (data.ok) {
         const {data} = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[data.desc]})
      }

   }
}


export function* addNewTriggerSagas({triggerData}) {
   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});

      const formData = new FormData();

      formData.append('manager_id', triggerData.manager_id);
      formData.append('user_token', localStorage.getItem('token'));
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
   }
}

export function* updateTriggerSaga({triggerData, updationData, changedSocial}) {
   const {messages, index, id, caption, botId, changedSlide, type} = triggerData;


   // console.log(triggerData, updationData);

   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('trigger_id', id);
      formData.append('caption', caption);
      formData.append('manager_id', botId);

      if (!updationData) {


      } else {
         if (updationData.type === 'text') {
            formData.append('type', updationData.type);
            formData.append('file', updationData.file);
            Object.assign(messages[changedSocial][index], {
               [updationData.type]: updationData[updationData.type]
            });
         } else {
            formData.append('type', updationData.type);
            formData.append('file', updationData.file);
            const {data} = yield call(uploadMedia, formData);
            if (data.ok) {
               // console.log(changedSlide);
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

      }


      formData.append('messages', JSON.stringify(messages));
      const {data} = yield call(updateTrigger, formData);

      if (data.ok) {
         const {data} = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }
}

export function* deleteTriggerSagas({triggerData}) {
   const {botId, id} = triggerData;


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('trigger_id', id);
      formData.append('manager_id', botId);


      const {data} = yield call(deleteTrigger, formData);

      if (data.ok) {
         const {data} = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }
}

export function* updateCaptionTriggerSaga({triggerData}) {
   const {id, caption, botId} = triggerData;


   // console.log(triggerData, updationData);

   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('trigger_id', id);
      formData.append('caption', caption);
      formData.append('manager_id', botId);


      const {data} = yield call(updateTrigger, formData);

      if (data.ok) {
         const {data} = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: data.scenarios});
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, error: signUpErrors[data.desc]})
      }

   }
}


export function* updateSocialInTriggerSagas({triggerData}) {
   const {id, botId, social} = triggerData;


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.SINGLE_BOT_DATA_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
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

   }
}

export function* getAllAutoridesSagas({botId}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.AUTORIDE_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', botId);


      const allAutorides = yield call(getAllAutorides, formData);


      if (allAutorides.data.ok) {
         yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});

         const allScenaries = yield call(getScenariesForManager, formData);
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

      } else {
         yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[allAutorides.data.desc]})
      }


   }
}

export function* appendNewAutorideSagas({managerId, trigger_text}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.AUTORIDE_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', managerId);
      formData.append('trigger_text', trigger_text);
      formData.append('destination', destinationScenario.autoride);


      const createScenarioStatus = yield call(addNewScenario, formData);


      if (createScenarioStatus.data.ok) {
         formData.append('trigger_text', trigger_text);
         formData.append('scenario_id', createScenarioStatus.data.scenario.id);

         const [createAutorideStatus, allScenaries, allAutorides] = yield all([
            call(addNewAutoride, formData),
            call(getScenariesForManager, formData),
            call(getAllAutorides, formData)
         ]);

         if (createAutorideStatus.data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
            yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
            yield put({type: ACTION.CHANGE_SCENARIO_ID, scenarioId: createScenarioStatus.data.scenario.id})
         }

         // const createAutorideStatus = yield call(addNewAutoride, formData);
         //
         // if(createAutorideStatus.data.ok) {
         //     const allScenaries = yield call(getScenariesForManager, formData);
         //     yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
         //     const allAutorides = yield call(getAllAutorides, formData);
         //     yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});
         // }

      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_ERROR, dataScenarios: createScenarioStatus.data.desc});
      }

   }
}

export function* getAllBroadCastSagas({managerId}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BROADCAST_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', managerId);

      const [allBroadcast, allScenaries] = yield all([
         call(getAllBroadCasts, formData),
         call(getScenariesForManager, formData),
      ]);

      //
      if (allBroadcast.data.ok) {
         yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});

         if (allScenaries.data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

         }

      } else {
         yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
      }


   }
}

export function* updateBroadCastSagas({broadCastData}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BROADCAST_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', broadCastData.managerId);
      formData.append('broadcast_id', broadCastData.id);
      formData.append('tag', broadCastData.tag);
      formData.append('time', broadCastData.time.toFixed(0));
      if (broadCastData.sent) {
         formData.append('sent', broadCastData.sent);
      }


      const [updateStatus, allScenaries] = yield all([
         call(updateBroadCasts, formData),
         call(getScenariesForManager, formData),
      ]);

      const allBroadcast = yield call(getAllBroadCasts, formData);

      if (updateStatus.data.ok) {
         if (allBroadcast.data.ok) {
            yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
         }

         if (allScenaries.data.ok) {
            yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});

         }

      } else {
         yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
      }


   }
}

export function* copyScenarioSagas({scenarioData}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BROADCAST_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', scenarioData.managerId);
      formData.append('trigger_text', scenarioData.trigger_text);
      formData.append('destination', scenarioData.destination);
      // formData.append('tag', broadCastData.tag);
      // formData.append('time', broadCastData.time.toFixed(0));
      // if(broadCastData.sent) {
      //     formData.append('sent', broadCastData.sent);
      // }
      //
      //
      // const [updateStatus, allScenaries] = yield all([
      //     call(updateBroadCasts, formData),
      //     call(getScenariesForManager, formData),
      // ]);
      //
      const copyScenarioStatus = yield call(addNewScenario, formData);


      if (copyScenarioStatus.data.ok) {
         formData.append('scenario_id', copyScenarioStatus.data.scenario.id);
         const result = yield all(
            scenarioData.triggers.forEach(elem => {
               formData.append('messages', elem.messages);
               formData.append('caption', elem.caption);
               call(addNewTrigger, formData);
            })
         );

         console.log(result, '>>>');
         // const allScenaries = yield call(getScenariesForManager, formData);
         //
         // yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});


         // const {data} = yield call(addNewTrigger, formData);

         // copyScenarioStatus.data.scenario.id
      } else {
         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, error: signUpErrors[copyScenarioStatus.data.desc]})
      }

      // if (updateStatus.data.ok) {
      //     if(allBroadcast.data.ok) {
      //         yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
      //     }
      //
      //     if(allScenaries.data.ok) {
      //         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
      //
      //     }
      //
      // } else {
      //     yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
      // }


   }
}

export function* appendBroadCastSagas({managerId}) {
   const futureTime = new Date().setFullYear(new Date().getFullYear() + 1);


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.BROADCAST_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', managerId);
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
            console.log(broadCastCreateStatus);
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
      // formData.append('broadcast_id', broadCastData.id);
      // formData.append('tag', broadCastData.tag);
      // formData.append('time', broadCastData.time.toFixed(0));
      // if(broadCastData.sent) {
      //     formData.append('sent', broadCastData.sent);
      // }
      //
      //
      // const [updateStatus, allScenaries] = yield all([
      //     call(updateBroadCasts, formData),
      //     call(getScenariesForManager, formData),
      // ]);
      //
      // const allBroadcast = yield call(getAllBroadCasts, formData);
      //
      // if (updateStatus.data.ok) {
      //     if(allBroadcast.data.ok) {
      //         yield put({type: ACTION.BROADCAST_RESPONSE, broadCastData: allBroadcast.data.broadcasts});
      //     }
      //
      //     if(allScenaries.data.ok) {
      //         yield put({type: ACTION.SINGLE_BOT_DATA_RESPONSE, dataScenarios: allScenaries.data.scenarios});
      //
      //     }
      //
      // } else {
      //     yield put({type: ACTION.BROADCAST_ERROR, error: signUpErrors[allBroadcast.data.desc]})
      // }


   }
}


export function* deleteAutorideSagas({managerId, idAutoride}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.AUTORIDE_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', managerId);
      formData.append('auto_ride_id', idAutoride);


      const delAutorideStatus = yield call(deleteAutoride, formData);


      if (delAutorideStatus.data.ok) {
         const allAutorides = yield call(getAllAutorides, formData);
         yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesData: allAutorides.data.auto_rides});

      } else {
         yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[delAutorideStatus.data.desc]})
      }


   }
}

export function* getAutorideLinksSagas({autorideData}) {


   if (localStorage.getItem('token')) {
      yield put({type: ACTION.AUTORIDE_REQUEST});


      const formData = new FormData();
      formData.append('user_token', localStorage.getItem('token'));
      formData.append('manager_id', autorideData.managerId);
      formData.append('autoride_id', autorideData.idAutoride);
      formData.append('social', 'all');


      const {data} = yield call(getAutoridesLink, formData);

      console.log(data);


      if (data.ok) {
         yield put({type: ACTION.AUTORIDE_RESPONSE, autoridesLinks: data.links});

      } else {
         yield put({type: ACTION.AUTORIDE_ERROR, error: signUpErrors[data.desc]})
      }


   }
}



