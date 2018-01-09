import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import sidebar from './sidebarReducer';

export default function createReducers() {
  return combineReducers({
    router,
    sidebar,
  });
};
