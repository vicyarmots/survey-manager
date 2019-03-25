import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import RegistrForm from 'containers/RegistrForm.jsx';
import LoginForm from 'containers/LoginForm.jsx';
import SurveyPage from '../containers/SurveyPage.jsx';
import { NoMatch } from '../components/NoMatch/index.jsx';
import { checkAuth } from '../utils/requiresLog.jsx';
import './index.css';

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const SiteRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/sign-up" component={RegistrForm} />
        <Route exact path="/home" component={checkAuth(SurveyPage)} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default SiteRouter;
