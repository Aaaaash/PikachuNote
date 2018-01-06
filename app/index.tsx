import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Route from './routes';
import './app.global.scss';

import { configureStore, history } from './store/configureStore.development';
const store = configureStore();

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