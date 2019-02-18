import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';

const root = <div id="root">1</div>;

ReactDOM.render(root, document.body);

ReactDOM.render(<App />, document.getElementById('root'));

