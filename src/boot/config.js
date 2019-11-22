import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import combinedReducers from '../reducers';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const enhancer = applyMiddleware(sagaMiddleware);

  const store = createStore(
     combinedReducers,
     composeWithDevTools(enhancer)
  );

  sagaMiddleware.run(rootSaga, store.dispatch);
  return store;
}
