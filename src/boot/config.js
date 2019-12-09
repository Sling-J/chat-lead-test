import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
   const enhancer = applyMiddleware(sagaMiddleware);

   const store = createStore(
      reducers,
      composeWithDevTools(enhancer)
   );

   sagaMiddleware.run(rootSaga);

   return store;
}
