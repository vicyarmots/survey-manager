import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/index.jsx';
import { Provider } from 'react-redux';
import store from './store/configure-store.js';

import './index.css';

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
