import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'ractor-react'
import { system } from './system/appSystem';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
// import { createBrowserHistory } from 'history';
import Route from './routes';
import './app.global.scss';

import { isDataBasebeCreated } from './api/indexdb';
import { INDEXED_DATABASE_NAME } from './common/constants';
import { SideBarStore } from './store/sidebar.store';
import initialDatabase from './initialDatabase';
// import configureStore from './configureStore';

// const initialState = {};

// const store = configureStore(initialState, history);

isDataBasebeCreated(INDEXED_DATABASE_NAME)
  .then((haveDb): any => {
    if (!haveDb) {
      return initialDatabase();
    }
    return null;
  })
  .then(() => {
    render(
      <AppContainer>
        <Provider system={system} stores={[SideBarStore]}>
          <Route />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
