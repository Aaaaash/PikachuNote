import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import treeViewReducer from './treeviewReducer';

const rootReducer = combineReducers({
  router,
  treeViewReducer,
});

export default rootReducer;
