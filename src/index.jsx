import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/configureStore.js';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './components/App/index.jsx';

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

import './index.scss';

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement
);
