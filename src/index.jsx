import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index.jsx';

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);
ReactDOM.render(<App />, rootElement);
