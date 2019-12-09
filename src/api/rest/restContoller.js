import axios from 'axios';
import {restURL} from '../baseURL';

export const signUp = (signUpData) => (
   axios.post(`${restURL}/CreateUser/`, signUpData)
);

export const auth = (authData) => (
   axios.post(`${restURL}/GetUserToken/`, authData)
);

export const createBot = (createBotData) => (
   axios.post(`${restURL}/CreateManager/`, createBotData)
);

export const deleteBot = (deleteBotData) => (
   axios.post(`${restURL}/DeleteManager/`, deleteBotData)
);

export const getAllBotsForUser = (userData) => (
   axios.post(`${restURL}/GetUserManagers/`, userData)
);

export const getScenariesForManager = (botData) => (
   axios.post(`${restURL}/GetScenarios/`, botData)
);

export const addNewScenario = (botData) => (
   axios.post(`${restURL}/CreateScenario/`, botData)
);

export const editScenario = (scenarioData) => (
   axios.post(`${restURL}/EditScenario/`, scenarioData)
);

export const deleteScenario = (scenarioData) => (
   axios.post(`${restURL}/DeleteScenario/`, scenarioData)
);

export const addNewTrigger = (triggerData) => (
   axios.post(`${restURL}/CreateTrigger/`, triggerData)
);

export const updateTrigger = (triggerData) => (
   axios.post(`${restURL}/EditTrigger/`, triggerData)
);

export const deleteTrigger = (triggerData) => (
   axios.post(`${restURL}/DeleteTrigger/`, triggerData)
);

export const uploadMedia = (mediaData) => (
   axios.post(`${restURL}/UploadFile/`, mediaData)
);

export const getAllAutorides = (botData) => (
   axios.post(`${restURL}/GetAutoRide/`, botData)
);

export const addNewAutoride = (data) => (
   axios.post(`${restURL}/CreateAutoRide/`, data)
);

export const deleteAutoride = (data) => (
   axios.post(`${restURL}/DeleteAutoRide/`, data)
);

export const deleteBroadcast = (data) => (
   axios.post(`${restURL}/DeleteBroadcast`, data)
);

export const getAutoridesLink = (data) => (
   axios.post(`${restURL}/GetAutoRideLink/`, data)
);

export const getAllBroadCasts = (data) => (
   axios.post(`${restURL}/GetBroadcastMessages/`, data)
);

export const appendBroadCast = (data) => (
   axios.post(`${restURL}/CreateBroadcast/`, data)
);

export const updateBroadCasts = (data) => (
   axios.post(`${restURL}/EditBroadcast/`, data)
);

// setup
export const getManager = (userData) => (
   axios.post(`${restURL}/GetManager/`, userData)
);

export const editManager = (setupData) => (
   axios.post(`${restURL}/EditManager/`, setupData)
);

export const getFacebookAuthUrl = (userData) => (
   axios.post(`${restURL}/FacebookAuth/`, userData)
);

export const getVkAuthUrl = (userData) => (
   axios.post(`${restURL}/VkAuth/`, userData)
);

export const getQRCodeUrl = (userData) => (
   axios.post(`${restURL}/GetQRCodeUrl/`, userData)
);

export const editFastButtonName = (idBtn) => (
   axios.post(`${restURL}/EditFastBtnName/`, idBtn)
);

export const getBotStatistics = botId => (
   axios.get(`http://188.225.57.229/${botId}/analytics/`)
);
