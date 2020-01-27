import {combineReducers} from 'redux';
import {connectRouter} from "connected-react-router";

import authReducer, {moduleName as authModule} from '../ducks/Auth';
import tagsReducer, {moduleName as tagsModule} from '../ducks/Tags';
import statisticsReducer, {moduleName as statisticsModule} from '../ducks/Statistics';
import paymentReducer, {moduleName as paymentModule} from '../ducks/Payment';

import botsReducers from './botsReducer';
import botSetupReducers from './botSetupReducer';
import singleBotReducers from './singleBotReducer';
import autoridesReducers from './autoridesReducer';
import broadCastReducers from './broadcastReducer';
import botPaymentReducer from "./botPaymentReducer";

export default history => combineReducers({
   router: connectRouter(history),
   [statisticsModule]: statisticsReducer,
   [paymentModule]: paymentReducer,
	[authModule]: authReducer,
	[tagsModule]: tagsReducer,
   botsReducers,
   singleBotReducers,
   autoridesReducers,
   broadCastReducers,
   botSetupReducers,
   botPaymentReducer,
});
