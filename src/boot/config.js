import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from 'redux-saga';

import history from "../config/history/history";
import saga from '../sagas/rootSaga';
import reducers from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(
   sagaMiddleware,
   routerMiddleware(history)
);

const store = createStore(
   reducers(history),
   composeWithDevTools(enhancer)
);

sagaMiddleware.run(saga);

export default store;
