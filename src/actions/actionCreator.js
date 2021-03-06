import ACTION from './actionTypes';

export const logout = history => ({
   type: ACTION.LOGOUT_ACTION,
   history
});

export const createBot = createBotData => ({
   type: ACTION.CREATE_BOT_ACTION,
   createBotData
});

export const deleteBot = deleteBotData => ({
   type: ACTION.DELETE_BOT_ACTION,
   deleteBotData
});

export const getAllBotsForUser = botId => ({
   type: ACTION.GET_ALL_BOTS_ACTION,
   botId
});

export const getAllScenariesForBot = idBot => ({
   type: ACTION.GET_ALL_SCENARIOS,
   idBot
});

export const addNewScenario = (botId, destination, trigger_text) => ({
   type: ACTION.ADD_NEW_SCENARIO,
   botId,
   destination,
   trigger_text
});

export const changeScenarioId = scenarioId => ({
   type: ACTION.CHANGE_SCENARIO_ID,
   scenarioId
});

export const changeSocial = social => ({
   type: ACTION.CHANGE_SOCIAL,
   social
});

export const copyScenario = scenarioData => ({
   type: ACTION.COPY_SCENARIO,
   scenarioData
});

export const editScenario = scenarioData => ({
   type: ACTION.EDIT_SCENARIO,
   scenarioData
});

export const deleteScenario = scenarioData => ({
   type: ACTION.DELETE_SCENARIO,
   scenarioData
});

export const addNewTrigger = triggerData => ({
   type: ACTION.ADD_NEW_TRIGGER,
   triggerData
});

export const updateTrigger = (triggerData, updationData, changedSocial) => ({
   type: ACTION.UPDATE_TRIGGER,
   triggerData,
   updationData,
   changedSocial
});

export const deleteTrigger = triggerData => ({
   type: ACTION.DELETE_TRIGGER,
   triggerData
});

export const editTriggerCaption = triggerData => ({
   type: ACTION.UPDATE_TRIGGER_TEXT,
   triggerData
});

export const copyTrigger = triggerData => ({
   type: ACTION.COPY_TRIGGER,
   payload: triggerData
});

export const updateSocialInTrigger = triggerData => ({
   type: ACTION.UPDATE_SOCIAL_IN_TRIGGER,
   triggerData
});

export const getAllAutorides = botId => ({
   type: ACTION.GET_ALL_AUTORIDES,
   botId
});

export const getAutorideLinks = autorideData => ({
   type: ACTION.GET_AUTORDIDE_LINKS,
   autorideData
});

export const addNewAutoride = (managerId, trigger_text) => ({
   type: ACTION.APPEND_AUTORIDE,
   managerId,
   trigger_text
});

export const copyAutoride = data => ({
   type: ACTION.COPY_AUTORIDE,
   data
});

export const deleteAutoride = data => ({
   type: ACTION.DELETE_AUTORIDE,
   data,
});

export const getAllBroadCasts = managerId => ({
   type: ACTION.GET_ALL_BROADCASTS,
   managerId
});

export const updateBroadCasts = broadCastData => ({
   type: ACTION.UPDATE_BROADCAST,
   broadCastData
});

export const appendBroadCast = data => ({
   type: ACTION.APPEND_BROADCAST,
   data
});

export const deleteBroadcast = data => ({
   type: ACTION.DELETE_BROADCAST,
   data
});

// setup

export const getManager = idBot => ({
   type: ACTION.GET_BOT_SETUP,
   idBot
});

export const editManager = setupData => ({
   type: ACTION.UPDATE_BOT_SETUP,
   setupData
});

export const updateBotReactions = reactionsData => ({
   type: ACTION.UPDATE_BOT_REACTIONS,
   reactionsData
});

export const facebookAuthUrl = idBot => ({
   type: ACTION.GET_FACEBOOK_AUTH_URL_REQUEST,
   idBot
});

export const vkAuthUrl = idBot => ({
   type: ACTION.GET_VK_AUTH_URL_REQUEST,
   idBot
});

export const QRCodeUrl = idBot => ({
   type: ACTION.GET_WA_QR_URL_REQUEST,
   idBot
});

export const getWpScreenshot = idBot => ({
   type: ACTION.GET_WP_SCREENSHOT_REQUEST,
   idBot
});

export const closeWpScreenshot = () => ({
   type: ACTION.CLOSE_WP_SCREENSHOT_REQUEST
});

export const getWpStatus = idBot => ({
   type: ACTION.GET_WP_STATUS_REQUEST,
   idBot
});

export const logoutWp = idBot => ({
   type: ACTION.LOGOUT_WP_STATUS_REQUEST,
   idBot
});

export const resetUrl = () => ({
   type: ACTION.RESET_URL
});

export const resetBotsData = () => ({
   type: ACTION.RESET_BOTS_DATA
});
