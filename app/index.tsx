import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import Route from './routes';
import './app.global.scss';

import { isDataBasebeCreated } from './api/indexdb';
import { INDEXED_DATABASE_NAME } from './common/constants';
import initialDatabase from './initialDatabase';
import configureStore from './configureStore';

const initialState = {};

const history = createBrowserHistory();
const store = configureStore(initialState, history);

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
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });

if ((module as any).hot) {
  (module as any).hot.accept('./routes', () => {
    const NextRoot = require('./routes').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <NextRoot />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
