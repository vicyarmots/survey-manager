import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store/configureStore.js';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';

import './index.scss';

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
