import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LoginForm from '../Login-form/index.jsx';
import RegistrForm from '../Registr-form/index.jsx';

import './index.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Router>
          <div>
        
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route path="/sign-up" component={RegistrForm} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default Main;
