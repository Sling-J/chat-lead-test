import {combineReducers} from 'redux';
import {connectRouter} from "connected-react-router";

import authReducer, {moduleName as authModule} from '../ducks/Auth';
import tagsReducer, {moduleName as tagsModule} from '../ducks/Tags';
import profileReducer, {moduleName as profileModule} from '../ducks/Profile';
import paymentReducer, {moduleName as paymentModule} from '../ducks/Payment';
import partnersReducer, {moduleName as partnersModule} from '../ducks/Partners';
import statisticsReducer, {moduleName as statisticsModule} from '../ducks/Statistics';
import growthToolReducer, {moduleName as growthToolModule} from '../ducks/GrowthTool';

import botsReducers from './botsReducer';
import botSetupReducers from './botSetupReducer';
import singleBotReducers from './singleBotReducer';
import autoridesReducers from './autoridesReducer';
import broadCastReducers from './broadcastReducer';
import botPaymentReducer from "./botPaymentReducer";

export default history => combineReducers({
   router: connectRouter(history),
   [statisticsModule]: statisticsReducer,
   [growthToolModule]: growthToolReducer,
   [partnersModule]: partnersReducer,
   [paymentModule]: paymentReducer,
   [profileModule]: profileReducer,
	[authModule]: authReducer,
	[tagsModule]: tagsReducer,
   botsReducers,
   singleBotReducers,
   autoridesReducers,
   broadCastReducers,
   botSetupReducers,
   botPaymentReducer,
});
