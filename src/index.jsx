import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/configureStore.js';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './components/App/index.jsx';
import { setUser } from './redux/user/action';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
import { getToken } from './helpers/tokenHelpers.js';
import jwt from 'jsonwebtoken';
import './index.scss';

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

const token = getToken();
if (!!token) {
  const userData = jwt.decode(token, { complete: true });
  store.dispatch(setUser(userData.payload));
  if (history.location.pathname === '/') {
    history.push('/home');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement
);
