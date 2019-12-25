import {combineReducers} from 'redux';
import {connectRouter} from "connected-react-router";

import authReducer from '../ducks/Auth';

import botsReducers from './botsReducer';
import botSetupReducers from './botSetupReducer';
import singleBotReducers from './singleBotReducer';
import autoridesReducers from './autoridesReducer';
import broadCastReducers from './broadcastReducer';
import botPaymentReducer from "./botPaymentReducer";
import botStatisticsReducer from "./botStatisticsReducer";

export default history => combineReducers({
   router: connectRouter(history),
   authReducer,
   botsReducers,
   singleBotReducers,
   autoridesReducers,
   broadCastReducers,
   botSetupReducers,
   botPaymentReducer,
   botStatisticsReducer
});
