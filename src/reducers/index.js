import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form";
import userReducers from '../reducers/userReducers';
import botsReducers from '../reducers/botsReducers';
import singleBotReducers from '../reducers/singleBotReducers';
import autoridesReducers from '../reducers/autoridesReducers';
import broadCastReducers from '../reducers/broadcastReducers';
import botSetupReducers from '../reducers/botSetupReducers';

const appReducer = combineReducers({
  userReducers,
  form: formReducer,
  botsReducers,
  singleBotReducers,
  autoridesReducers,
  broadCastReducers,
  botSetupReducers
});

const rootReducer = (state, action) => appReducer(state, action);
export default rootReducer;
