import {instance} from '../baseURL';

export const signUp = signUpData => (
   instance.post(`/CreateUser/`, signUpData)
);

export const auth = authData => (
   instance.post(`/GetUserToken/`, authData)
);

export const createBot = createBotData => (
   instance.post(`/CreateManager/`, createBotData)
);

export const deleteBot = deleteBotData => (
   instance.post(`/DeleteManager/`, deleteBotData)
);

export const getAllBotsForUser = userData => (
   instance.post(`/GetUserManagers/`, userData)
);

export const getScenariesForManager = botData => (
   instance.post(`/GetScenarios/`, botData)
);

export const addNewScenario = botData => (
   instance.post(`/CreateScenario/`, botData)
);

export const editScenario = scenarioData => (
   instance.post(`/EditScenario/`, scenarioData)
);

export const deleteScenario = scenarioData => (
   instance.post(`/DeleteScenario/`, scenarioData)
);

export const addNewTrigger = triggerData => (
   instance.post(`/CreateTrigger/`, triggerData)
);

export const updateTrigger = triggerData => (
   instance.post(`/EditTrigger/`, triggerData)
);

export const deleteTrigger = triggerData => (
   instance.post(`/DeleteTrigger/`, triggerData)
);

export const uploadMedia = mediaData => (
   instance.post(`/UploadFile/`, mediaData)
);

export const getAllAutorides = botData => (
   instance.post(`/GetAutoRide/`, botData)
);

export const addNewAutoride = data => (
   instance.post(`/CreateAutoRide/`, data)
);

export const deleteAutoride = data => (
   instance.post(`/DeleteAutoRide/`, data)
);

export const deleteBroadcast = data => (
   instance.post(`/DeleteBroadcast`, data)
);

export const getAutoridesLink = data => (
   instance.post(`/GetAutoRideLink/`, data)
);

export const getAllBroadCasts = data => (
   instance.post(`/GetBroadcastMessages/`, data)
);

export const appendBroadCast = data => (
   instance.post(`/CreateBroadcast/`, data)
);

export const updateBroadCasts = data => (
   instance.post(`/EditBroadcast/`, data)
);

// setup
export const getManager = userData => (
   instance.post(`/GetManager/`, userData)
);

export const editManager = setupData => (
   instance.post(`/EditManager/`, setupData)
);

export const getFacebookAuthUrl = userData => (
   instance.post(`/FacebookAuth/`, userData)
);

export const getVkAuthUrl = userData => (
   instance.post(`/VkAuth/`, userData)
);

export const getQRCodeUrl = userData => (
   instance.post(`/GetQRCodeUrl/`, userData)
);

export const getWpScreenshot = userData => (
	instance.post('/GetScreenshot/', userData)
);

export const getWpStatus = userData => (
	instance.post('/GetStatus/', userData)
);

export const logoutWp = userData => (
	instance.post('/Logout/', userData)
);

export const getBotStatistics = data => (
   instance.post('/GetAnalytics/', data)
);

export const exportUsers = data => (
   instance.post('/ExportUsers/', data)
);

export const addPayment = data => (
   instance.post('/AddPayment/', data)
);

export const getTransactions = token => (
   instance.post('/GetTransactions/', token)
);