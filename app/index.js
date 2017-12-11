import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  // module.hot.accept('./containers/Root', () => {
  //   const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
  //   render(
  //     <AppContainer>
  //       <NextRoot store={store} history={history} />
  //     </AppContainer>,
  //     document.getElementById('root')
  //   );
  // });
}
