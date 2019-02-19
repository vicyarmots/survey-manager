import React, { Component } from 'react';
import Header from '../Header/index.jsx';
import LoginForm from '../Login-form/index.jsx';


import './index.css';

class App extends Component {;
  render() {
    return (
      <div>
        <Header/>
        <LoginForm/>
      </div>
    );
  }
}

export default App;
