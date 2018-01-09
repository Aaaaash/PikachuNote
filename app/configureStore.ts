import { routerMiddleware }  from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { History } from 'history';
import {
  applyMiddleware,
  GenericStoreEnhancer,
  compose,
  createStore,
  Middleware,
} from 'redux';

import createReducers from './reducers';
import rootEpics from './epics';

export default (initialState: Object | void, history: History) => {
  const epicMiddleware = createEpicMiddleware(rootEpics);

  const middlewares: Middleware[] = [
    routerMiddleware(history),
    epicMiddleware,
  ];

  const enhaners: GenericStoreEnhancer[] = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers: Function =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose;

  const store = createStore(
    createReducers(),
    initialState,
    composeEnhancers(...enhaners)
  );

  return store;
};
