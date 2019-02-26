import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrForm from 'registrForm';
import LoginForm from 'loginForm';
import './index.css';

const SiteRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/sign-up" component={RegistrForm} />
      </Switch>
    </Router>
  );
};

export default SiteRouter;
