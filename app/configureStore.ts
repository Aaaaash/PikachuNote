import { routerMiddleware }  from 'react-router-redux';
import { History } from 'history';
import {
  applyMiddleware,
  GenericStoreEnhancer,
  compose,
  createStore,
  Middleware,
} from 'redux';

import createReducers from './reducers';

export default (initialState: Object | void, history: History) => {
  const middlewares: Middleware[] = [
    routerMiddleware(history),
  ];

  const enhaners: GenericStoreEnhancer[] = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers: Function =
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
