import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";

import userReducers from './userReducer';
import botsReducers from './botsReducer';
import botSetupReducers from './botSetupReducer';
import singleBotReducers from './singleBotReducer';
import autoridesReducers from './autoridesReducer';
import broadCastReducers from './broadcastReducer';
import botStatisticsReducer from "./botStatisticsReducer";

export default combineReducers({
   form: formReducer,
   userReducers,
   botsReducers,
   singleBotReducers,
   autoridesReducers,
   broadCastReducers,
   botSetupReducers,
   botStatisticsReducer
});
