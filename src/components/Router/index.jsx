import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LoginForm from '../Login-form/index.jsx';
import RegistrForm from '../Registr-form/index.jsx';
import './index.css';

class SiteRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Router>
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route path="/sign-up" component={RegistrForm} />
            </Switch>
        </Router>
      </main>
    );
  }
}

export default SiteRouter;