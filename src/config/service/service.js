import axios from 'axios';

const production = process.env.REACT_APP_SERVER === 'production';

const baseUrl = production
   ? 'https://api.chatlead.io/app/api'
   : 'https://api.chatlead.io/app/api';

export const staticMedia = `https://api.chatlead.io`;

const instance = axios.create({
   baseURL: baseUrl,
   headers: {
      'Content-Type': 'application/json',
   }
});

export const Auth = {
   login: authData => instance.post('/GetUserToken/', authData),
   register: signUpData => instance.post(`/CreateUser/`, signUpData)
};

export const Bots = {
   getBots: userData => instance.post(`/GetUserManagers/`, userData),
   createBot: createBotData => instance.post(`/CreateManager/`, createBotData),
   deleteBot: deleteBotData => instance.post(`/DeleteManager/`, deleteBotData)
};

export const Scenarios = {
   getScenarios: botData => instance.post(`/GetScenarios/`, botData),
   createScenario: botData => instance.post(`/CreateScenario/`, botData),
   deleteScenario: scenarioData => instance.post(`/DeleteScenario/`, scenarioData),
   editScenario: scenarioData => instance.post(`/EditScenario/`, scenarioData)
};

export const Media = {
   uploadMedia: mediaData => instance.post(`/UploadFile/`, mediaData),
};

export const Triggers = {
   createTrigger: triggerData => instance.post(`/CreateTrigger/`, triggerData),
   deleteTrigger: triggerData => instance.post(`/DeleteTrigger/`, triggerData),
   editTrigger: triggerData => instance.post(`/EditTrigger/`, triggerData),
};

export const AutoRides = {
   getAutoRides: botData => instance.post(`/GetAutoRide/`, botData),
   getAutoRideLinks: data => instance.post(`/GetAutoRideLink/`, data),
   createAutoRide: data => instance.post(`/CreateAutoRide/`, data),
   deleteAutoRide: data =>  instance.post(`/DeleteAutoRide/`, data)
};

export const BroadCasts = {
   getBroadCasts: data => instance.post(`/GetBroadcastMessages/`, data),
   createBroadCast: data => instance.post(`/CreateBroadcast/`, data),
   editBroadCast: data => instance.post(`/EditBroadcast/`, data),
   deleteBroadcast: data => instance.post(`/DeleteBroadcast`, data)
};

export const Manager = {
   getManager: userData => instance.post(`/GetManager/`, userData),
   editManager: setupData => instance.post(`/EditManager/`, setupData),
   getFacebookAuthUrl: userData => instance.post(`/FacebookAuth/`, userData),
   getVkAuthUrl: userData => instance.post(`/VkAuth/`, userData),
   getQRCodeUrl: userData => instance.post(`/GetQRCodeUrl/`, userData)
};

export const BotStatistics = {
   getBotStatistics: data => instance.post(`/GetAnalytics/`, data),
   exportUsers: data => instance.post('/ExportUsers/', data),
   importUsers: data => instance.post('/ImportUsers/', data),
};

export const Payments = {
   addPayment: data => instance.post('/AddPayment/', data),
   getTransactions: data => instance.post('/GetTransactions/', data),
};

export const Profile = {
   getProfile: data => instance.post('/GetProfile/', data),
   updateProfile: data => instance.post('/UpdateProfile/', data),
};

export const Tags = {
   addTag: data => instance.post('/AddTags/', data),
   deleteTag: data => instance.post('/DeleteTag/', data),
   getTags: data => instance.post('/GetTags/', data),
};

export const GrowthTool = {
   mlp: {
      get: data => instance.post('/GetMLP/', data),
      create: data => instance.post('/CreateMLP/', data),
      update: data => instance.post('/UpdateMLP/', data),
      delete: data => instance.post('/DeleteMLP/', data),
      getForUser: data => instance.post('/GetMlpGuest/', data),
      getForms: data => instance.post('/GetMLPForms/', data)
   }
};

export const Partners = {
   getBalance: data => instance.post('/GetBalance/', data),
   addMoneyRequest: data => instance.post('/AddMoneyRequest/', data),
   getMoneyRequests: data => instance.post('/GetMoneyRequests/', data),
};